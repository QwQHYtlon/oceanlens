export const DEPTH_ZONES = [
  {
    id: 'epipelagic',
    name: '表層帶',
    englishName: 'Epipelagic Zone',
    subtitle: '陽光帶',
    min: 0,
    max: 200,
    color: '#00b4d8',
  },
  {
    id: 'mesopelagic',
    name: '中層帶',
    englishName: 'Mesopelagic Zone',
    subtitle: '微光帶',
    min: 200,
    max: 1000,
    color: '#0096d6',
  },
  {
    id: 'bathypelagic',
    name: '深層帶',
    englishName: 'Bathypelagic Zone',
    subtitle: '無光帶',
    min: 1000,
    max: 4000,
    color: '#0077b6',
  },
  {
    id: 'abyssopelagic',
    name: '深淵帶',
    englishName: 'Abyssopelagic Zone',
    subtitle: '深淵',
    min: 4000,
    max: 6000,
    color: '#023e8a',
  },
  {
    id: 'hadalpelagic',
    name: '超深淵帶',
    englishName: 'Hadalpelagic Zone',
    subtitle: '海溝帶',
    min: 6000,
    max: Number.POSITIVE_INFINITY,
    color: '#03045e',
  },
];

export const parseDepth = (depth = '') => {
  const values = String(depth)
    .replace(/,/g, '')
    .match(/\d+/g)
    ?.map(Number);

  if (!values || values.length === 0) {
    return { min: 0, max: 0, valid: false };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
    valid: true,
  };
};

export const getDepthZones = (depth) => {
  const { min, max, valid } = parseDepth(depth);
  if (!valid) return [];

  // A single depth such as "0m" still needs one zone to match.
  const upperBound = max === min ? min + 1 : max;

  return DEPTH_ZONES.filter(
    (zone) => upperBound > zone.min && min < zone.max,
  );
};

export const getDeepestZone = (depth) => {
  const zones = getDepthZones(depth);
  return zones[zones.length - 1] ?? null;
};

export const getDepthZoneLabel = (depth) => {
  const zones = getDepthZones(depth);
  if (zones.length === 0) return '';
  if (zones.length === 1) return zones[0].name;
  return `${zones[0].name}–${zones[zones.length - 1].name}`;
};

export const getDepthZoneIds = (depth) => getDepthZones(depth).map((zone) => zone.id);
