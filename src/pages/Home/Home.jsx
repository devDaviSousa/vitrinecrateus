import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryCarousel } from '../../components/CategoryCarousel/CategoryCarousel.jsx';
import { CompanyGrid } from '../../components/CompanyGrid/CompanyGrid.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle.jsx';
import { companies } from '../../data/companies.js';
import { useTheme } from '../../hooks/useTheme/useTheme.js';

import {
  Brand,
  Intro,
  LoadMoreButton,
  Page,
  ResultLine,
  SearchBox,
  Shell,
  Topbar,
} from './Home.styles.js';

const categories = ['Todas', ...new Set(companies.map((company) => company.categoria.nome))];
const categorySearchIndex = categories
  .filter((category) => category !== 'Todas')
  .map((category) => ({ category, normalizedName: normalizeSearchText(category) }));
const searchableCompanies = companies.map((company) => ({
  company,
  normalizedCategory: normalizeSearchText(company.categoria.nome),
}));
const PAGE_SIZE = 24;

function normalizeSearchText(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findCategoryByPrefix(value) {
  const normalizedQuery = normalizeSearchText(value);
  if (!normalizedQuery) return 'Todas';

  return categorySearchIndex.find(({ normalizedName }) => normalizedName.startsWith(normalizedQuery))?.category
    ?? 'Todas';
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleLimit(PAGE_SIZE);
  }, [query, activeCategory]);

  const handleSearchChange = (value) => {
    setQuery(value);
    setActiveCategory(findCategoryByPrefix(value));
  };

  const handleCategoryChange = useCallback((category) => {
    setQuery('');
    setActiveCategory((currentCategory) =>
      currentCategory === category ? 'Todas' : category,
    );
  }, []);

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);
    return searchableCompanies
      .filter(({ company, normalizedCategory }) => {
        const matchesCategory = activeCategory === 'Todas' || company.categoria.nome === activeCategory;
        const matchesQuery = !normalizedQuery || normalizedCategory.startsWith(normalizedQuery);
        return matchesCategory && matchesQuery;
      })
      .map(({ company }) => company);
  }, [query, activeCategory]);
  const visibleCompanies = filteredCompanies.slice(0, visibleLimit);

  return (
    <Page>
      <Shell>
        <Topbar>
          <Brand href="#inicio" aria-label="Vitrine Crateús, início">
            <span className="brand-mark" aria-hidden="true">.vc</span>
            <span className="brand-name">Vitrine Crateús</span>
          </Brand>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </Topbar>
        <SearchBox>
          <Icon name="search" size={19} />
          <input
            type="search"
            placeholder="Busque por categoria"
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            aria-label="Buscar por categoria"
          />
        </SearchBox>

        <CategoryCarousel
          categories={categories}
          selectedCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <ResultLine>
          <span><strong>{filteredCompanies.length} resultados</strong> em Crateús</span>
          <span>{categories.length - 1} categorias</span>
        </ResultLine>

        <CompanyGrid companies={visibleCompanies} />

        {visibleLimit < filteredCompanies.length && (
          <LoadMoreButton
            type="button"
            onClick={() => setVisibleLimit((currentLimit) => currentLimit + PAGE_SIZE)}
          >
            Mostrar mais resultados ({filteredCompanies.length - visibleLimit} restantes)
          </LoadMoreButton>
        )}
      </Shell>
    </Page>
  );
}
