import { memo, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import { BotaoAvaliacoes } from '../BotaoAvaliacoes/BotaoAvaliacoes.jsx';
import { getCategoryIcon } from '../../utils/categoryIcons.js';
import {
  Card,
  CategoryTag,
  CompanyName,
  Content,
  Cover,
  FollowButton,
  Footer,
  ImageFallback,
  Location,
} from './CompanyCard.styles.js';

export const CompanyCard = memo(function CompanyCard({ company }) {
  const [imageFailed, setImageFailed] = useState(false);
  const lastInstagramClickRef = useRef(0);
  const instagramUrl = `https://www.instagram.com/${company.nome.replace(/^@/, '')}/`;

  const handleInstagramClick = (event) => {
    const now = Date.now();
    if (now - lastInstagramClickRef.current < 700) {
      event.preventDefault();
      return;
    }

    lastInstagramClickRef.current = now;
  };

  return (
    <Card>
      <Cover>
        {imageFailed ? (
          <ImageFallback aria-hidden="true">
            {company.nome.replace(/^@/, '').slice(0, 2).toUpperCase()}
          </ImageFallback>
        ) : (
          <img
            src={company.imagem}
            alt={`Imagem ilustrativa da categoria ${company.categoria.nome}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
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
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInstagramClick}
            aria-label={`Abrir o Instagram de ${company.nome}`}
          >
            Conhecer
            <Icon name="arrow" size={17} />
          </FollowButton>
        </Footer>
      </Content>
    </Card>
  );
});
