import { useDeferredValue, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Waves, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import SpeciesCard from '../components/SpeciesCard/SpeciesCard';
import Button from '../components/Button/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { speciesData, speciesCategories } from '../data/speciesData';
import { OCEAN_TAGS, speciesMatchesOcean } from '../data/oceanTags';
import { SORT_OPTIONS, filterSpecies, sortSpecies } from '../utils/species';
import './Species.css';

const PAGE_SIZE = 24;

const Species = () => {
  useDocumentTitle('海洋生物');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOcean, setSelectedOcean] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const deferredSearch = useDeferredValue(searchTerm);
  const normalizedQuery = deferredSearch.trim().toLowerCase();

  const categoryFilter = useMemo(
    () => speciesCategories.find((category) => category.id === selectedCategory)?.category ?? null,
    [selectedCategory],
  );

  const categoryCounts = useMemo(() => {
    const counts = { all: speciesData.length };
    for (const species of speciesData) {
      counts[species.category] = (counts[species.category] || 0) + 1;
    }
    return counts;
  }, []);

  const oceanCounts = useMemo(() => {
    const counts = {};
    for (const tag of OCEAN_TAGS) {
      counts[tag.id] =
        tag.id === 'all'
          ? speciesData.length
          : speciesData.filter((species) => speciesMatchesOcean(species, tag.id)).length;
    }
    return counts;
  }, []);

  const filteredSpecies = useMemo(
    () =>
      filterSpecies(speciesData, {
        query: normalizedQuery,
        category: categoryFilter,
        ocean: selectedOcean,
      }),
    [categoryFilter, normalizedQuery, selectedOcean],
  );

  const sortedSpecies = useMemo(
    () => sortSpecies(filteredSpecies, sortBy),
    [filteredSpecies, sortBy],
  );

  const visibleSpecies = sortedSpecies.slice(0, visibleCount);
  const hasFilters =
    searchTerm.trim() !== '' || selectedCategory !== 'all' || selectedOcean !== 'all';
  const remainingCount = Math.max(sortedSpecies.length - visibleSpecies.length, 0);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setVisibleCount(PAGE_SIZE);
  };

  const handleOceanChange = (oceanId) => {
    setSelectedOcean(oceanId);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedOcean('all');
    setSortBy('default');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="species">
      <div className="container">
        <SectionTitle
          eyebrow="SPECIES DATABASE"
          title="海洋生物"
          subtitle="探索神奇的海洋生命"
          align="center"
        />

        <div className="species__filters">
          <div className="species__search">
            <Search className="species__search-icon" size={20} aria-hidden="true" />
            <input
              type="search"
              placeholder="搜尋名稱、英文名、棲息地或分類…"
              value={searchTerm}
              onChange={handleSearchChange}
              className="species__search-input"
              aria-label="搜尋海洋生物"
            />
            {searchTerm && (
              <button
                type="button"
                className="species__search-clear"
                onClick={() => {
                  setSearchTerm('');
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label="清除搜尋"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="species__categories" role="group" aria-label="依分類篩選">
            {speciesCategories.map((category) => {
              const count = category.category
                ? categoryCounts[category.category] ?? 0
                : speciesData.length;
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`species__category ${active ? 'species__category--active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                  aria-pressed={active}
                >
                  {category.name}
                  <span className="species__category-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="species__oceans" role="group" aria-label="依海域篩選">
            <span className="species__oceans-label">
              <Waves size={15} aria-hidden="true" />
              海域
            </span>
            <div className="species__ocean-list">
              {OCEAN_TAGS.map((tag) => {
                const active = selectedOcean === tag.id;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    className={`species__ocean ${active ? 'species__ocean--active' : ''}`}
                    onClick={() => handleOceanChange(tag.id)}
                    aria-pressed={active}
                  >
                    {tag.name}
                    <span className="species__ocean-count">{oceanCounts[tag.id] ?? 0}</span>
                  </button>
                );
              })}
            </div>
            <p className="species__ocean-hint">
              同一物種可能分布於多個大洋；全球分布物種請使用「全球分布」標籤。
            </p>
          </div>
        </div>

        <div className="species__meta">
          <span aria-live="polite">
            共 <strong>{filteredSpecies.length}</strong> 種海洋生物
            {normalizedQuery && ` · 搜尋「${deferredSearch.trim()}」`}
          </span>
          <div className="species__meta-actions">
            <label className="species__sort" htmlFor="species-sort">
              排序
              <select id="species-sort" value={sortBy} onChange={handleSortChange}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {hasFilters && (
              <button type="button" className="species__clear-filters" onClick={handleClearFilters}>
                <SlidersHorizontal size={14} aria-hidden="true" />
                清除篩選
              </button>
            )}
          </div>
        </div>

        {filteredSpecies.length > 0 ? (
          <>
            <div className="species__grid">
              {visibleSpecies.map((species) => (
                <SpeciesCard key={species.id} species={species} />
              ))}
            </div>

            <div className="species__footer">
              <span className="species__progress">
                已顯示 {visibleSpecies.length} / {filteredSpecies.length} 種
              </span>
              {remainingCount > 0 && (
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  載入更多（剩餘 {remainingCount} 種）
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="species__empty">
            <Search size={40} aria-hidden="true" />
            <h3 className="species__empty-title">沒有找到符合條件的海洋生物</h3>
            <p className="species__empty-text">試試其他關鍵字，或清除分類篩選。</p>
            <Button variant="secondary" size="small" onClick={handleClearFilters}>
              清除篩選
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Species;
