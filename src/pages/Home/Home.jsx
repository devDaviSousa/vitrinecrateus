import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryCarousel } from '../../components/CategoryCarousel/CategoryCarousel.jsx';
import { CompanyGrid } from '../../components/CompanyGrid/CompanyGrid.jsx';
import { Icon } from '../../components/Icon/Icon.jsx';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle.jsx';
import { useCategoriasDeServico } from '../../hooks/useCategoriasDeServico/useCategoriasDeServico.js';
import { useServicos } from '../../hooks/useServicos/useServicos.js';
import { resolveServiceLogo } from '../../services/api.js';

import {
  Brand,
  CategoryLoadError,
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
  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategoriasDeServico();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

  const categoryById = useMemo(
    () => new Map(categoryData
      .filter((category) => category?.id != null)
      .map((category) => [String(category.id), category])),
    [categoryData],
  );
  const companies = useMemo(() => data.map((servico) => {
    const serviceCategory = servico.categoriaDeServico
      ?? (typeof servico.categoria === 'object' ? servico.categoria : null);
    const categoryId = serviceCategory?.id ?? servico.categoria;
    const category = (serviceCategory?.nome
      ? serviceCategory
      : categoryById.get(String(categoryId)));

    return {
      id: servico.id,
      nome: servico.nome,
      categoria: {
        id: category?.id ?? categoryId,
        nome: category?.nome?.trim() || 'Sem categoria',
      },
      local: [
        [servico.rua, servico.numerodoendereco].filter(Boolean).join(', '),
        [servico.bairro, servico.cidade].filter(Boolean).join(', '),
      ].filter(Boolean).join(' · ') || 'Localização não informada',
      imagem: resolveServiceLogo(servico.logo),
      classificacao: servico.classificacao,
    };
  }), [categoryById, data]);
  const serviceCategoryIds = useMemo(
    () => new Set(companies
      .map((company) => company.categoria.id)
      .filter((id) => id != null)
      .map(String)),
    [companies],
  );
  const categories = useMemo(
    () => ['Todas', ...new Set(categoryData
      .filter((category) => (
        category?.id != null
        && serviceCategoryIds.has(String(category.id))
        && typeof category.nome === 'string'
        && category.nome.trim()
      ))
      .map((category) => category.nome.trim()))],
    [categoryData, serviceCategoryIds],
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

  useEffect(() => {
    if (
      !isCategoriesLoading
      && !categoriesError
      && activeCategory !== 'Todas'
      && !categories.includes(activeCategory)
    ) {
      setActiveCategory('Todas');
    }
  }, [activeCategory, categories, categoriesError, isCategoriesLoading]);

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
          isLoading={isCategoriesLoading || isLoading}
        />

        {categoriesError && (
          <CategoryLoadError role="alert">
            <span>
              Não foi possível carregar as categorias.{' '}
              {typeof categoriesError.message === 'string' ? categoriesError.message : 'Tente novamente.'}
            </span>
            <button type="button" onClick={refetchCategories}>Tentar novamente</button>
          </CategoryLoadError>
        )}

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
