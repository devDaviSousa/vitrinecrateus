import { useEffect, useState } from 'react';
import { ModalAvaliacao } from '../ModalAvaliacao/ModalAvaliacao.jsx';
import { RatingStars, ratingFormatter } from '../RatingStars/RatingStars.jsx';
import { Rating } from '../RatingStars/RatingStars.styles.js';
import { ReviewCount, ReviewSummary } from './BotaoAvaliacoes.styles.js';

const emptyClassification = { media: null, quantidade: 0 };

export function BotaoAvaliacoes({ serviceId, companyName, classification }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentClassification, setCurrentClassification] = useState(
    classification ?? emptyClassification,
  );
  const averageRating = currentClassification.media;
  const reviewCount = currentClassification.quantidade;
  const hasRating = Number.isFinite(averageRating);
  const formattedReviewCount = `${reviewCount} ${reviewCount === 1 ? 'avaliação' : 'avaliações'}`;

  useEffect(() => {
    setCurrentClassification(classification ?? emptyClassification);
  }, [classification]);

  return (
    <>
      <ReviewSummary
        type="button"
        aria-label={`Abrir avaliações de ${companyName}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        {hasRating && <Rating>{ratingFormatter.format(averageRating)}</Rating>}
        <RatingStars rating={averageRating} />
        <ReviewCount>
          {reviewCount > 0 ? formattedReviewCount : 'Sem avaliações'}
        </ReviewCount>
      </ReviewSummary>

      <ModalAvaliacao
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceId={serviceId}
        companyName={companyName}
        classification={currentClassification}
        onClassificationChange={setCurrentClassification}
      />
    </>
  );
}
