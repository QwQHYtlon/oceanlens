import { pathToFileURL } from 'node:url';
import { speciesData, speciesCategories } from '../src/data/speciesData.js';
import { simulationData } from '../src/data/simulationData.js';
import { navItems, isNavItemActive } from '../src/data/navigation.js';
import { OCEAN_TAGS, getSpeciesOceans, speciesMatchesOcean } from '../src/data/oceanTags.js';

const REQUIRED_SPECIES_FIELDS = [
  'id',
  'name',
  'englishName',
  'depth',
  'habitat',
  'category',
  'description',
  'detailedDescription',
  'image',
  'size',
  'diet',
  'conservation',
];

export function validateSpeciesData(data = speciesData, categories = speciesCategories) {
  const errors = [];
  const ids = new Map();
  const names = new Map();

  if (!Array.isArray(data) || data.length === 0) {
    return ['speciesData 必須是非空陣列。'];
  }

  data.forEach((species, index) => {
    const facts = Array.isArray(species.facts) ? species.facts : [];

    for (const field of REQUIRED_SPECIES_FIELDS) {
      if (typeof species[field] !== 'string' || !species[field].trim()) {
        errors.push(`第 ${index + 1} 筆缺少或欄位格式錯誤：${field}`);
      }
    }

    if (species.id && !/^[a-z0-9-]+$/.test(species.id)) {
      errors.push(`id 格式錯誤（僅允許小寫英文、數字、連字號）：${species.id}`);
    }

    if (species.id) {
      if (ids.has(species.id)) {
        errors.push(`重複 id：${species.id}`);
      }
      ids.set(species.id, species);
    }

    const nameKey = `${species.name}|${String(species.englishName).toLowerCase()}`;
    if (names.has(nameKey)) {
      errors.push(`重複生物概念：${species.name} / ${species.englishName}`);
    }
    names.set(nameKey, species);

    if (facts.length === 0) {
      errors.push(`缺少 facts：${species.id}`);
    } else {
      const uniqueFacts = new Set(facts);
      if (uniqueFacts.size !== facts.length) {
        errors.push(`facts 內有重複項目：${species.id}`);
      }
    }

    if (!/^\d+\s*(?:[-–—~]\s*\d+\s*)?m$/i.test(species.depth)) {
      errors.push(`depth 格式錯誤（例如 0m 或 0-200m）：${species.id} → ${species.depth}`);
    }
  });

  const categoryValues = categories
    .map((category) => category.category)
    .filter((category) => category !== null);

  if (new Set(categoryValues).size !== categoryValues.length) {
    errors.push('speciesCategories 有重複分類。');
  }

  const dataCategories = new Set(data.map((species) => species.category));
  for (const category of dataCategories) {
    if (!categoryValues.includes(category)) {
      errors.push(`speciesCategories 缺少資料中的分類：${category}`);
    }
  }

  for (const category of categoryValues) {
    if (!dataCategories.has(category)) {
      errors.push(`分類沒有任何生物：${category}`);
    }
  }

  return errors;
}

export function validateSimulationData(data = simulationData) {
  const errors = [];
  const { initial, ranges } = data;

  for (const key of Object.keys(initial)) {
    const range = ranges[key];
    if (!range) {
      errors.push(`simulationData.ranges 缺少 ${key}`);
      continue;
    }
    if (initial[key] < range.min || initial[key] > range.max) {
      errors.push(`simulationData.initial.${key} 不在範圍內。`);
    }
  }

  const extreme = [
    data.calculate(ranges.temperature.min, ranges.pollution.min, ranges.plastic.min),
    data.calculate(ranges.temperature.max, ranges.pollution.max, ranges.plastic.max),
  ];

  for (const metrics of extreme) {
    for (const [key, value] of Object.entries(metrics)) {
      if (!Number.isInteger(value) || value < 0 || value > 100) {
        errors.push(`calculate() 的 ${key} 必須是 0–100 整數，目前為 ${value}`);
      }
    }
  }

  const seriesDefinitions = [
    ['getTemperatureSeries', [0, 0], 9, 24, 32],
    ['getPollutionSeries', [28, 0], 11, 0, 100],
    ['getPlasticSeries', [28, 0], 11, 0, 100],
    ['getStressSeries', [], 11, 0, 100],
  ];

  for (const [method, args, length, minX, maxX] of seriesDefinitions) {
    const series = data[method](...args);
    if (!Array.isArray(series) || series.length !== length) {
      errors.push(`${method} 應回傳 ${length} 個資料點。`);
      continue;
    }
    if (series[0].x !== minX || series[series.length - 1].x !== maxX) {
      errors.push(`${method} 的 X 範圍應為 ${minX}–${maxX}。`);
    }
    if (series.some((point) => point.y < 0 || point.y > 100)) {
      errors.push(`${method} 的 Y 值必須在 0–100 之間。`);
    }
  }

  return errors;
}

export function validateNavigationData(items = navItems) {
  const errors = [];
  const paths = new Set();

  for (const item of items) {
    if (!item.path?.startsWith('/')) errors.push(`導覽路徑格式錯誤：${item.path}`);
    if (!item.label) errors.push(`導覽項目缺少 label：${item.path}`);
    if (paths.has(item.path)) errors.push(`導覽路徑重複：${item.path}`);
    paths.add(item.path);
  }

  if (!isNavItemActive('/', '/')) errors.push('首頁 active 判斷錯誤。');
  if (!isNavItemActive('/species', '/species/anglerfish')) {
    errors.push('子路由應讓父導覽項目 active。');
  }
  if (isNavItemActive('/species', '/species-extra')) {
    errors.push('/species 不應匹配 /species-extra。');
  }

  return errors;
}

export function validateOceanTags(data = speciesData) {
  const errors = [];
  const validIds = new Set(OCEAN_TAGS.map((tag) => tag.id));

  for (const species of data) {
    const oceans = getSpeciesOceans(species.habitat);
    if (oceans.length === 0) {
      errors.push(`無法從 habitat 解析大洋：${species.id} → ${species.habitat}`);
    }
    for (const ocean of oceans) {
      if (!validIds.has(ocean)) {
        errors.push(`未知的大洋標籤：${ocean}（${species.id}）`);
      }
    }
  }

  for (const tag of OCEAN_TAGS) {
    if (tag.id === 'all') continue;
    if (!data.some((species) => speciesMatchesOcean(species, tag.id))) {
      errors.push(`大洋標籤沒有任何生物：${tag.name}`);
    }
  }

  return errors;
}

export function collectValidationErrors() {
  return [
    ...validateSpeciesData(),
    ...validateSimulationData(),
    ...validateNavigationData(),
    ...validateOceanTags(),
  ];
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const errors = collectValidationErrors();
  if (errors.length > 0) {
    console.error(`❌ 資料驗證失敗（${errors.length} 項）：`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `✅ 資料驗證通過：${speciesData.length} 種生物、${speciesCategories.length} 個分類、${OCEAN_TAGS.length} 個海域標籤、${navItems.length} 個導覽項目。`,
  );
}
