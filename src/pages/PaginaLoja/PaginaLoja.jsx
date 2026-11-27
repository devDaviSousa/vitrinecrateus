import { CabecalhoLoja } from '../../components/CabecalhoLoja/CabecalhoLoja.jsx';
import { IdentidadeLoja } from '../../components/IdentidadeLoja/IdentidadeLoja.jsx';
import { LinksLoja } from '../../components/LinksLoja/LinksLoja.jsx';
import { ProdutosLoja } from '../../components/ProdutosLoja/ProdutosLoja.jsx';
import { companies } from '../../data/companies.js';
import { paginaLojaData } from '../../data/paginaLoja.js';
import {
  IdentityColumn,
  LinksColumn,
  PageShell,
  ProductsColumn,
  StoreContent,
  StorePage,
} from './PaginaLoja.styles.js';

function formatStoreName(company) {
  if (company.id === 1) return paginaLojaData.name;

  return company.nome
    .replace(/^@/, '')
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase('pt-BR') + part.slice(1))
    .join(' ');
}

export default function PaginaLoja({ companyId }) {
  const company = companyId === null || companyId === undefined
    ? companies[0]
    : companies.find((item) => String(item.id) === companyId);

  if (!company) {
    return (
      <StorePage>
        <PageShell>
          <CabecalhoLoja />
          <p role="alert">Não foi possível encontrar esta loja.</p>
        </PageShell>
      </StorePage>
    );
  }

  return (
    <StorePage>
      <PageShell>
        <CabecalhoLoja />
        <StoreContent>
          <IdentityColumn>
            <IdentidadeLoja
              name={formatStoreName(company)}
              category={company.id === 1 ? paginaLojaData.category : company.categoria.nome}
              logo={company.imagem}
            />
          </IdentityColumn>
          {/* <ProductsColumn>
            <ProdutosLoja products={paginaLojaData.products} />
          </ProductsColumn> */}
          <LinksColumn>
            <LinksLoja
              website={paginaLojaData.website}
              socialNetworks={paginaLojaData.socialNetworks}
            />
          </LinksColumn>
        </StoreContent>
      </PageShell>
    </StorePage>
  );
}
