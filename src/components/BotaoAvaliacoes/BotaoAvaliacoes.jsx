import { useEffect, useState } from 'react';
import { ModalAvaliacao } from '../ModalAvaliacao/ModalAvaliacao.jsx';
import { RatingStars, ratingFormatter } from '../RatingStars/RatingStars.jsx';
import { Rating } from '../RatingStars/RatingStars.styles.js';
import { ReviewCount, ReviewSummary } from './BotaoAvaliacoes.styles.js';
import {
  getSiteReviewSummary,
  getSiteReviewsStorageKey,
  loadSiteReviews,
} from '../../utils/siteReviews.js';

export function BotaoAvaliacoes({ companyName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [siteReviews, setSiteReviews] = useState(() => loadSiteReviews(companyName));
  const { averageRating, reviewCount } = getSiteReviewSummary(siteReviews);
  const hasRating = Number.isFinite(averageRating);
  const formattedReviewCount = `${reviewCount} ${reviewCount === 1 ? 'avaliação' : 'avaliações'}`;

  useEffect(() => {
    const storageKey = getSiteReviewsStorageKey(companyName);
    setSiteReviews(loadSiteReviews(companyName));
    const syncReviews = (event) => {
      if (event.key === storageKey || event.key === null) {
        setSiteReviews(loadSiteReviews(companyName));
      }
    };

    window.addEventListener('storage', syncReviews);
    return () => window.removeEventListener('storage', syncReviews);
  }, [companyName]);

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
        companyName={companyName}
        siteReviews={siteReviews}
        onReviewsChange={setSiteReviews}
      />
    </>
  );
}
