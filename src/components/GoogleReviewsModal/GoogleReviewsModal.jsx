import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { RatingStars, ratingFormatter } from '../RatingStars/RatingStars.jsx';
import { Rating } from '../RatingStars/RatingStars.styles.js';
import { ReviewForm } from '../ReviewForm/ReviewForm.jsx';
import { SiteReviewCard } from '../SiteReviewCard/SiteReviewCard.jsx';
import { SiteReviewList } from '../SiteReviewList/SiteReviewList.jsx';
import {
  DialogBody,
  DialogCompany,
  DialogMessage,
  DialogReviewCount,
  DialogScore,
  WriteReviewButton,
} from './GoogleReviewsModal.styles.js';

function getSavedSiteReviews(companyName) {
  if (typeof window === 'undefined') return [];

  try {
    const savedReviews = window.localStorage.getItem(`site-reviews:${companyName}`);
    const parsedReviews = savedReviews ? JSON.parse(savedReviews) : [];
    return Array.isArray(parsedReviews) ? parsedReviews : [];
  } catch {
    return [];
  }
}

export function GoogleReviewsModal({
  isOpen,
  onClose,
  companyName,
  rating,
  reviewCount,
}) {
  const [screen, setScreen] = useState('reviews');
  const [siteReviews, setSiteReviews] = useState(() => getSavedSiteReviews(companyName));
  const [isPersisted, setIsPersisted] = useState(true);
  const hasRating = Number.isFinite(rating);
  const hasReviewCount = Number.isFinite(reviewCount);
  const modalTitle = screen === 'form'
    ? 'Deixe sua avaliação'
    : screen === 'success'
      ? 'Avaliação cadastrada'
      : 'Resumo das avaliações';

  const handleReviewSubmit = (formData) => {
    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const updatedReviews = [...siteReviews, newReview];
    let savedToBrowser = false;

    try {
      window.localStorage.setItem(`site-reviews:${companyName}`, JSON.stringify(updatedReviews));
      savedToBrowser = true;
    } catch {
      // Keep the review available in this open session when browser storage is unavailable.
    }

    setSiteReviews(updatedReviews);
    setIsPersisted(savedToBrowser);
    setScreen('success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      //subtitle={modalSubtitle}
    >
      {screen === 'form' ? (
        <ReviewForm onSubmit={handleReviewSubmit} />
      ) : screen === 'success' ? (
        <DialogBody>
          <DialogCompany>Obrigado pela sua avaliação!</DialogCompany>
          <DialogMessage>
            {isPersisted
              ? 'Ela foi salva neste navegador e aparecerá aqui nas próximas visitas.'
              : 'Ela ficará disponível nesta sessão, mas o navegador não permitiu salvá-la para depois.'}
          </DialogMessage>
          <SiteReviewCard review={siteReviews[siteReviews.length - 1]} />
          <WriteReviewButton type="button" onClick={() => setScreen('reviews')}>
            Voltar às avaliações
          </WriteReviewButton>
        </DialogBody>
      ) : (
        <>
          <DialogBody>
            <DialogCompany>{companyName}</DialogCompany>
            {hasRating ? (
              <DialogScore>
                <Rating>{ratingFormatter.format(rating)}</Rating>
                <RatingStars rating={rating} />
              </DialogScore>
            ) : (
              <DialogMessage>Esta empresa ainda não possui uma nota cadastrada.</DialogMessage>
            )}
            <DialogReviewCount>
              {hasReviewCount ? `${reviewCount} avaliações` : 'Sem avaliações cadastradas'}
            </DialogReviewCount>
          </DialogBody>

          <SiteReviewList reviews={siteReviews} />

          <WriteReviewButton type="button" onClick={() => setScreen('form')}>
            Escrever uma avaliação
          </WriteReviewButton>
        </>
      )}
    </Modal>
  );
}
