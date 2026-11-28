import { useEffect, useState } from 'react';
import { CabecalhoLoja } from '../../components/CabecalhoLoja/CabecalhoLoja.jsx';
import { IdentidadeLoja } from '../../components/IdentidadeLoja/IdentidadeLoja.jsx';
import { LinksLoja } from '../../components/LinksLoja/LinksLoja.jsx';
import { companies } from '../../data/companies.js';
import { paginaLojaData } from '../../data/paginaLoja.js';
import { resolveServiceLogo } from '../../services/api.js';
import { getServicoById } from '../../services/servicosService.js';
import {
  IdentityColumn,
  LinksColumn,
  PageShell,
  StoreContent,
  StorePage,
} from './PaginaLoja.styles.js';

const socialNetworkFields = [
  { key: 'instagram', name: 'Instagram', icon: 'instagram' },
  { key: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp' },
  { key: 'facebook', name: 'Facebook', icon: 'facebook' },
  { key: 'linkedin', name: 'LinkedIn', icon: 'business' },
];

function getErrorMessage(error) {
  const responseMessage = error.response?.data?.message;
  if (typeof responseMessage === 'string') return responseMessage;
  if (typeof error.message === 'string') return error.message;
  return 'Tente novamente em instantes.';
}

function getWhatsappHref(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  if (/^https?:\/\//i.test(value)) return value;

  const phone = value.replace(/\D/g, '');
  if (!phone) return '';

  return `https://wa.me/${phone.startsWith('55') ? phone : `55${phone}`}`;
}

function getServiceLocation(service) {
  return [
    [service.rua, service.numerodoendereco].filter(Boolean).join(', '),
    [service.bairro, service.cidade].filter(Boolean).join(', '),
  ].filter(Boolean).join(' · ');
}

function getSocialNetworks(service) {
  const networks = service.redesSociais || {};

  return socialNetworkFields.map(({ key, name, icon }) => ({
    name,
    icon,
    href: key === 'whatsapp' ? getWhatsappHref(networks[key]) : networks[key] || '',
  }));
}

export default function PaginaLoja({ companyId }) {
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(companyId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      setService(null);
      setError(null);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setService(null);
    setError(null);
    setIsLoading(true);

    async function loadService() {
      try {
        const result = await getServicoById(companyId, { signal: controller.signal });
        setService(result);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(getErrorMessage(requestError));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadService();
    return () => controller.abort();
  }, [companyId]);

  const fallbackService = !companyId
    ? {
      nome: paginaLojaData.name,
      logo: companies[0].imagem,
      categoriaDeServico: { nome: paginaLojaData.category },
    }
    : null;
  const store = service || fallbackService;

  if (isLoading || error || !store) {
    return (
      <StorePage>
        <PageShell>
          <CabecalhoLoja />
          {isLoading && <p role="status">Carregando informações da loja...</p>}
          {error && <p role="alert">Não foi possível carregar esta loja. {error}</p>}
          {!isLoading && !error && !store && (
            <p role="alert">Não foi possível encontrar esta loja.</p>
          )}
        </PageShell>
      </StorePage>
    );
  }

  const category = store.categoriaDeServico?.nome
    || store.categoria?.nome
    || (typeof store.categoria === 'string' ? store.categoria : '')
    || 'Sem categoria';
  const redesSociais = store.redesSociais;
  const websiteHref = redesSociais?.site || '';
  const website = service
    ? {
      title: 'Site da loja',
      description: websiteHref || 'Site não informado',
      href: websiteHref,
    }
    : paginaLojaData.website;
  const socialNetworks = service
    ? getSocialNetworks(store)
    : paginaLojaData.socialNetworks;

  return (
    <StorePage>
      <PageShell>
        <CabecalhoLoja />
        <StoreContent>
          <IdentityColumn>
            <IdentidadeLoja
              name={store.nome || 'Loja sem nome'}
              category={category}
              logo={service ? resolveServiceLogo(store.logo) : store.logo}
              location={getServiceLocation(store)}
            />
          </IdentityColumn>
          <LinksColumn>
            <LinksLoja
              website={website}
              socialNetworks={socialNetworks}
            />
          </LinksColumn>
        </StoreContent>
      </PageShell>
    </StorePage>
  );
}
