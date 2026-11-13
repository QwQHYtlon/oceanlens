import test from 'node:test';
import assert from 'node:assert/strict';
import { speciesData, speciesCategories } from '../src/data/speciesData.js';
import { simulationData } from '../src/data/simulationData.js';
import { navItems } from '../src/data/navigation.js';
import { filterSpecies, sortSpecies, getDepthValue } from '../src/utils/species.js';
import {
  getDeepestZone,
  getDepthZoneIds,
  getDepthZoneLabel,
  getDepthZones,
  parseDepth,
} from '../src/utils/depth.js';
import {
  OCEAN_TAGS,
  getSpeciesOceans,
  speciesMatchesOcean,
} from '../src/data/oceanTags.js';
import {
  collectValidationErrors,
  validateNavigationData,
  validateDepthZones,
  validateOceanTags,
  validateSimulationData,
  validateSpeciesData,
} from '../scripts/validate-data.mjs';

test('species data has no structural errors', () => {
  assert.deepEqual(validateSpeciesData(), []);
});

test('species data has unique ids and unique name/English combinations', () => {
  const ids = speciesData.map((species) => species.id);
  assert.equal(new Set(ids).size, ids.length);

  const names = speciesData.map(
    (species) => `${species.name}|${species.englishName.toLowerCase()}`,
  );
  assert.equal(new Set(names).size, names.length);
});

test('every category filter can return at least one species', () => {
  for (const category of speciesCategories) {
    if (category.category === null) {
      assert.ok(speciesData.length > 0);
      continue;
    }
    assert.ok(
      speciesData.some((species) => species.category === category.category),
      `分類 ${category.name} 不應為空`,
    );
  }
});

test('simulation data is valid and series stay in range', () => {
  assert.deepEqual(validateSimulationData(), []);
});

test('simulation calculate clamps values to 0–100', () => {
  const low = simulationData.calculate(
    simulationData.ranges.temperature.min,
    simulationData.ranges.pollution.min,
    simulationData.ranges.plastic.min,
  );
  const high = simulationData.calculate(
    simulationData.ranges.temperature.max,
    simulationData.ranges.pollution.max,
    simulationData.ranges.plastic.max,
  );

  for (const metrics of [low, high]) {
    for (const value of Object.values(metrics)) {
      assert.ok(value >= 0 && value <= 100);
      assert.ok(Number.isInteger(value));
    }
  }
});

test('navigation active state supports nested routes', () => {
  assert.deepEqual(validateNavigationData(), []);
  assert.equal(navItems.length, 5);
});

test('all validation checks pass together', () => {
  assert.deepEqual(collectValidationErrors(), []);
});

test('species sorting handles names, depths and categories', () => {
  const sample = [
    { id: 'b', name: 'Beta', category: 'Zeta', depth: '200-500m' },
    { id: 'a', name: 'Alpha', category: 'Alpha', depth: '0m' },
    { id: 'c', name: 'Charlie', category: 'Zeta', depth: '0-200m' },
  ];

  assert.deepEqual(sortSpecies(sample, 'name').map((item) => item.id), ['a', 'b', 'c']);
  assert.deepEqual(sortSpecies(sample, 'depth').map((item) => item.id), ['a', 'c', 'b']);
  assert.deepEqual(sortSpecies(sample, 'category').map((item) => item.id), ['a', 'b', 'c']);
  assert.deepEqual(sortSpecies(sample, 'default').map((item) => item.id), ['b', 'a', 'c']);
  assert.deepEqual(sample.map((item) => item.id), ['b', 'a', 'c']);
  assert.equal(getDepthValue('0m'), 0);
  assert.equal(getDepthValue('200-2000m'), 200);
  assert.equal(getDepthValue('unknown'), Number.POSITIVE_INFINITY);
});

test('category filter never leaks species from another category', () => {
  const invertebrates = filterSpecies(speciesData, { category: '無脊椎動物' });
  assert.ok(invertebrates.length > 0);
  assert.ok(invertebrates.every((species) => species.category === '無脊椎動物'));
  assert.ok(!invertebrates.some((species) => species.id === 'anglerfish'));
  assert.ok(!invertebrates.some((species) => species.id === 'bluefin-tuna'));

  const reptiles = filterSpecies(speciesData, { category: '爬行動物' });
  assert.ok(reptiles.length > 0);
  assert.ok(reptiles.every((species) => species.category === '爬行動物'));
  assert.ok(reptiles.some((species) => species.id === 'turtle'));

  const mammals = filterSpecies(speciesData, { category: '哺乳動物' });
  assert.ok(mammals.every((species) => species.category === '哺乳動物'));
  assert.ok(mammals.some((species) => species.id === 'whale'));
});

test('search and category filters combine correctly', () => {
  const results = filterSpecies(speciesData, { query: '海龜', category: '爬行動物' });
  assert.ok(results.length > 0);
  assert.ok(results.every((species) => species.category === '爬行動物'));
  assert.ok(results.every((species) => `${species.name} ${species.englishName}`.includes('龜')));
});

test('known taxonomic labels stay correct', () => {
  const byId = new Map(speciesData.map((species) => [species.id, species]));
  assert.equal(byId.get('seahorse').category, '魚類');
  assert.equal(byId.get('electric-ray').category, '魚類');
  assert.equal(byId.get('blobfish').category, '魚類');
  assert.equal(byId.get('pipefish').category, '魚類');
  assert.equal(byId.get('leafy-seadragon').category, '魚類');
  assert.equal(byId.get('sea-snake').category, '爬行動物');
  assert.equal(byId.get('turtle').category, '爬行動物');
  assert.equal(byId.get('whale').category, '哺乳動物');
});


test('ocean tags are derived correctly from habitat', () => {
  assert.deepEqual(getSpeciesOceans('全球海洋'), ['global']);
  assert.deepEqual(getSpeciesOceans('印度-太平洋'), ['indian', 'pacific']);
  assert.deepEqual(getSpeciesOceans('南大洋'), ['southern']);
  assert.deepEqual(getSpeciesOceans('淡水'), ['freshwater']);
  assert.deepEqual(getSpeciesOceans('澳洲深海'), ['pacific', 'indian']);
  assert.deepEqual(validateOceanTags(), []);
  assert.equal(OCEAN_TAGS.length, 8);
});

test('ocean filter tags are strict and keep global species separate', () => {
  const pacific = filterSpecies(speciesData, { ocean: 'pacific' });
  assert.ok(pacific.length > 0);
  assert.ok(pacific.every((species) => getSpeciesOceans(species.habitat).includes('pacific')));

  const global = filterSpecies(speciesData, { ocean: 'global' });
  assert.ok(global.length > 0);
  assert.ok(global.every((species) => getSpeciesOceans(species.habitat).includes('global')));

  const freshwater = filterSpecies(speciesData, { ocean: 'freshwater' });
  assert.equal(freshwater.length, 3);
  assert.ok(freshwater.every((species) => speciesMatchesOcean(species, 'freshwater')));
  assert.ok(freshwater.some((species) => species.id === 'electric-eel'));
  assert.ok(freshwater.some((species) => species.id === 'amazon-river-dolphin'));

  assert.ok(!pacific.some((species) => species.id === 'whale'));
  assert.ok(global.some((species) => species.id === 'whale'));
});

test('category and ocean filters combine', () => {
  const results = filterSpecies(speciesData, {
    category: '珊瑚礁',
    ocean: 'pacific',
  });
  assert.ok(results.length > 0);
  assert.ok(results.every((species) => species.category === '珊瑚礁'));
  assert.ok(
    results.every((species) => getSpeciesOceans(species.habitat).includes('pacific')),
  );
});


test('pressure multiplier chart matches the current ecosystem score', () => {
  const current = simulationData.calculate(28, 20, 15);
  const series = simulationData.getPressureMultiplierSeries(28, 20, 15);
  const currentPoint = series.find((point) => point.x === 100);

  assert.ok(currentPoint);
  assert.equal(currentPoint.y, current.ecosystemHealth);
  assert.equal(series[0].x, 0);
  assert.equal(series[series.length - 1].x, 150);
  assert.equal(series.length, 16);
  assert.ok(series.every((point) => point.y >= 0 && point.y <= 100));
});


test('species catalog reaches at least 300 entries', () => {
  assert.ok(speciesData.length >= 300);
  assert.ok(speciesData.some((species) => species.id === 'blue-tang'));
  assert.ok(speciesData.some((species) => species.id === 'emperor-penguin'));
  assert.ok(speciesData.some((species) => species.id === 'giant-pacific-octopus'));
  assert.ok(speciesData.some((species) => species.id === 'seagrass'));
});


test('depth zones use the standard boundaries', () => {
  assert.deepEqual(parseDepth('0-200m'), { min: 0, max: 200, valid: true });
  assert.deepEqual(parseDepth('200-1000m'), { min: 200, max: 1000, valid: true });
  assert.deepEqual(parseDepth('6000m'), { min: 6000, max: 6000, valid: true });

  assert.deepEqual(getDepthZones('0-200m').map((zone) => zone.id), ['epipelagic']);
  assert.deepEqual(getDepthZones('0-1000m').map((zone) => zone.id), [
    'epipelagic',
    'mesopelagic',
  ]);
  assert.deepEqual(getDepthZones('1000-4000m').map((zone) => zone.id), ['bathypelagic']);
  assert.deepEqual(getDepthZones('4000-6000m').map((zone) => zone.id), ['abyssopelagic']);
  assert.deepEqual(getDepthZones('6000m').map((zone) => zone.id), ['hadalpelagic']);
  assert.equal(getDeepestZone('0-2000m').id, 'bathypelagic');
  assert.equal(getDepthZoneLabel('0-2000m'), '表層帶–深層帶');
});

test('every species has a valid depth position tag', () => {
  assert.deepEqual(validateDepthZones(), []);
  for (const species of speciesData) {
    const zones = getDepthZones(species.depth);
    assert.ok(zones.length > 0, `${species.id} 缺少深度分層`);
    assert.ok(getDeepestZone(species.depth));
  }
});

test('depth zone filter keeps species inside the selected band', () => {
  const epipelagic = filterSpecies(speciesData, { depthZone: 'epipelagic' });
  assert.ok(epipelagic.length > 0);
  assert.ok(
    epipelagic.every((species) => getDepthZoneIds(species.depth).includes('epipelagic')),
  );
  assert.ok(epipelagic.some((species) => species.id === 'turtle'));
  assert.ok(!epipelagic.some((species) => species.id === 'colossal-squid'));

  const hadal = filterSpecies(speciesData, { depthZone: 'hadalpelagic' });
  assert.ok(hadal.length > 0);
  assert.ok(
    hadal.every((species) => getDepthZoneIds(species.depth).includes('hadalpelagic')),
  );
  assert.ok(hadal.some((species) => species.id === 'foraminifera'));
});

test('category, ocean and depth filters can be combined', () => {
  const results = filterSpecies(speciesData, {
    category: '魚類',
    ocean: 'pacific',
    depthZone: 'bathypelagic',
  });
  assert.ok(results.length > 0);
  assert.ok(results.every((species) => species.category === '魚類'));
  assert.ok(results.every((species) => speciesMatchesOcean(species, 'pacific')));
  assert.ok(
    results.every((species) => getDepthZoneIds(species.depth).includes('bathypelagic')),
  );
});
