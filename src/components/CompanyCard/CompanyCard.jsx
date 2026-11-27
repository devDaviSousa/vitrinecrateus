import { memo, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import { BotaoAvaliacoes } from '../BotaoAvaliacoes/BotaoAvaliacoes.jsx';
import { getCategoryIcon } from '../../utils/categoryIcons.js';
import {
  Card,
  CategoryTag,
  CompanyName,
  Content,
  Cover,
  CoverLink,
  FollowButton,
  Footer,
  ImageFallback,
  Location,
} from './CompanyCard.styles.js';

export const CompanyCard = memo(function CompanyCard({ company }) {
  const [imageFailed, setImageFailed] = useState(false);
  const storeUrl = `/paginaLoja?companyId=${encodeURIComponent(company.id)}`;
  const imageContent = imageFailed ? (
    <ImageFallback aria-hidden="true">
      {company.nome.replace(/^@/, '').slice(0, 2).toUpperCase()}
    </ImageFallback>
  ) : (
    <img
      src={company.imagem}
      alt={`Imagem da loja ${company.nome}`}
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  );

  return (
    <Card>
      <Cover>
        <CoverLink href={storeUrl} aria-label={`Ver informações da loja ${company.nome}`}>
          {imageContent}
        </CoverLink>
        <CategoryTag>
          <Icon name={getCategoryIcon(company.categoria.nome)} size={14} />
          {company.categoria.nome}
        </CategoryTag>
      </Cover>
      <Content>
        <CompanyName>
          <span>{company.nome}</span>
        </CompanyName>
        <Location><Icon name="pin" />{company.local}</Location>
        <BotaoAvaliacoes
          companyName={company.nome}
          rating={company.googleRating}
          reviewCount={company.googleReviewCount}
        />
        <Footer>
          <FollowButton
            href={storeUrl}
            aria-label={`Abrir a página da loja ${company.nome}`}
          >
            Conhecer
            <Icon name="arrow" size={17} />
          </FollowButton>
        </Footer>
      </Content>
    </Card>
  );
});
