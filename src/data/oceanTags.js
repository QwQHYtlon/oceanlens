export const OCEAN_TAGS = [
  { id: 'all', name: '全部' },
  { id: 'pacific', name: '太平洋' },
  { id: 'atlantic', name: '大西洋' },
  { id: 'indian', name: '印度洋' },
  { id: 'arctic', name: '北冰洋' },
  { id: 'southern', name: '南大洋' },
  { id: 'global', name: '全球分布' },
  { id: 'freshwater', name: '淡水' },
];

const OCEAN_RULES = [
  { pattern: /淡水|河流/, tags: ['freshwater'] },
  { pattern: /南大洋/, tags: ['southern'] },
  { pattern: /北冰洋|北極海洋/, tags: ['arctic'] },
  { pattern: /加拉帕戈斯/, tags: ['pacific'] },
  { pattern: /澳洲/, tags: ['pacific', 'indian'] },
  { pattern: /印度-西太平洋|印度-太平洋/, tags: ['indian', 'pacific'] },
  { pattern: /南半球海洋/, tags: ['pacific', 'atlantic', 'indian', 'southern'] },
  { pattern: /北半球海洋|北半球沿海/, tags: ['pacific', 'atlantic', 'arctic'] },
  {
    pattern: /熱帶海洋|熱帶與亞熱帶海洋|溫帶與熱帶海洋|熱帶淺海|潮間帶/,
    tags: ['pacific', 'atlantic', 'indian'],
  },
  { pattern: /西印度洋|熱帶印度洋|印度洋/, tags: ['indian'] },
  { pattern: /西大西洋|北大西洋|大西洋/, tags: ['atlantic'] },
  {
    pattern: /西北太平洋|北太平洋|東太平洋|熱帶西太平洋|熱帶太平洋|西太平洋|太平洋/,
    tags: ['pacific'],
  },
  { pattern: /全球|深海/, tags: ['global'] },
];

const TAG_NAMES = new Map(OCEAN_TAGS.map((tag) => [tag.id, tag.name]));

/**
 * Resolve ocean tags from the free-text habitat field.
 * A species can belong to several oceans (e.g. Indian–Pacific).
 */
export const getSpeciesOceans = (habitat = '') => {
  const rule = OCEAN_RULES.find(({ pattern }) => pattern.test(habitat));
  return rule ? [...rule.tags] : [];
};

export const speciesMatchesOcean = (species, oceanId) => {
  if (oceanId === 'all') return true;
  return getSpeciesOceans(species.habitat).includes(oceanId);
};

export const getOceanLabels = (habitat = '') =>
  getSpeciesOceans(habitat).map((id) => TAG_NAMES.get(id)).filter(Boolean);
