import test from 'node:test';
import assert from 'node:assert/strict';
import { speciesData, speciesCategories } from '../src/data/speciesData.js';
import { simulationData } from '../src/data/simulationData.js';
import { navItems } from '../src/data/navigation.js';
import { filterSpecies, sortSpecies, getDepthValue } from '../src/utils/species.js';
import {
  collectValidationErrors,
  validateNavigationData,
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
