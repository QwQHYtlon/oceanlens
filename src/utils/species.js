export const SORT_OPTIONS = [
  { id: 'default', label: '預設排序' },
  { id: 'name', label: '名稱' },
  { id: 'depth', label: '深度（淺 → 深）' },
  { id: 'category', label: '分類' },
];

const byName = (a, b) => a.name.localeCompare(b.name, 'zh-Hant');

export const getDepthValue = (depth = '') => {
  const value = Number.parseInt(String(depth).replace(/,/g, ''), 10);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
};

export const sortSpecies = (species, sortBy = 'default') => {
  const copy = [...species];

  if (sortBy === 'name') return copy.sort(byName);

  if (sortBy === 'depth') {
    return copy.sort((a, b) => {
      const difference = getDepthValue(a.depth) - getDepthValue(b.depth);
      return difference || byName(a, b);
    });
  }

  if (sortBy === 'category') {
    return copy.sort(
      (a, b) => a.category.localeCompare(b.category, 'zh-Hant') || byName(a, b),
    );
  }

  return copy;
};

export const filterSpecies = (species, { query = '', category = null } = {}) => {
  const normalizedQuery = query.trim().toLowerCase();

  return species.filter((item) => {
    if (category && item.category !== category) return false;
    if (!normalizedQuery) return true;

    return [item.name, item.englishName, item.habitat, item.category]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });
};
