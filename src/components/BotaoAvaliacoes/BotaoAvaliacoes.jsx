import { useState } from 'react';
import { ModalAvaliacao } from '../ModalAvaliacao/ModalAvaliacao.jsx';
import { RatingStars, ratingFormatter } from '../RatingStars/RatingStars.jsx';
import { Rating } from '../RatingStars/RatingStars.styles.js';
import { ReviewCount, ReviewSummary } from './BotaoAvaliacoes.styles.js';

export function BotaoAvaliacoes({ companyName, rating, reviewCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasRating = Number.isFinite(rating);
  const hasReviewCount = Number.isFinite(reviewCount);

  return (
    <>
      <ReviewSummary
        type="button"
        aria-label={`Abrir avaliações do Google de ${companyName}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        {hasRating && <Rating>{ratingFormatter.format(rating)}</Rating>}
        <RatingStars rating={rating} />
        <ReviewCount>
          {hasReviewCount ? `${reviewCount} avaliações` : 'Sem avaliações'}
        </ReviewCount>
      </ReviewSummary>

      <ModalAvaliacao
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        companyName={companyName}
        rating={rating}
        reviewCount={reviewCount}
      />
    </>
  );
}
