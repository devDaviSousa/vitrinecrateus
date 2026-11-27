import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryCarousel } from '../../components/CategoryCarousel/CategoryCarousel.jsx';
import { CompanyGrid } from '../../components/CompanyGrid/CompanyGrid.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle.jsx';
import { useServicos } from '../../hooks/useServicos/useServicos.js';

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

const PAGE_SIZE = 24;

function normalizeSearchText(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findCategoryByPrefix(value, categorySearchIndex) {
  const normalizedQuery = normalizeSearchText(value);
  if (!normalizedQuery) return 'Todas';

  return categorySearchIndex.find(({ normalizedName }) => normalizedName.startsWith(normalizedQuery))?.category
    ?? 'Todas';
}

export default function Home({ theme, toggleTheme }) {
  const { data, isLoading, error, refetch } = useServicos();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

  const companies = useMemo(() => data.map((servico) => ({
    id: servico.id,
    nome: servico.nome,
    categoria: {
      id: servico.categoriaDeServico?.id ?? servico.categoria,
      nome: servico.categoriaDeServico?.nome || 'Sem categoria',
    },
    local: [
      [servico.rua, servico.numerodoendereco].filter(Boolean).join(', '),
      [servico.bairro, servico.cidade].filter(Boolean).join(', '),
    ].filter(Boolean).join(' · ') || 'Localização não informada',
    imagem: servico.logo,
  })), [data]);
  const categories = useMemo(
    () => ['Todas', ...new Set(companies.map((company) => company.categoria.nome))],
    [companies],
  );
  const categorySearchIndex = useMemo(
    () => categories
      .filter((category) => category !== 'Todas')
      .map((category) => ({ category, normalizedName: normalizeSearchText(category) })),
    [categories],
  );
  const searchableCompanies = useMemo(
    () => companies.map((company) => ({
      company,
      normalizedCategory: normalizeSearchText(company.categoria.nome),
    })),
    [companies],
  );

  useEffect(() => {
    setVisibleLimit(PAGE_SIZE);
  }, [query, activeCategory]);

  const handleSearchChange = (value) => {
    setQuery(value);
    setActiveCategory(findCategoryByPrefix(value, categorySearchIndex));
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
  }, [searchableCompanies, query, activeCategory]);
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
          isSearching={Boolean(query.trim())}
        />

        {!isLoading && !error && (
          <ResultLine>
            <span><strong>{filteredCompanies.length} resultados</strong> em Crateús</span>
            <span>{categories.length - 1} categorias</span>
          </ResultLine>
        )}

        <CompanyGrid
          companies={visibleCompanies}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />

        {!isLoading && !error && visibleLimit < filteredCompanies.length && (
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
