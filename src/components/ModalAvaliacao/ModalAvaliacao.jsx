import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { RatingStars, ratingFormatter } from '../RatingStars/RatingStars.jsx';
import { Rating } from '../RatingStars/RatingStars.styles.js';
import { FormularioAvaliacao } from '../FormularioAvaliacao/FormularioAvaliacao.jsx';
import { CardAvaliacao } from '../CardAvaliacao/CardAvaliacao.jsx';
import { ListaDeAvaliacao } from '../ListaDeAvaliacao/ListaDeAvaliacao.jsx';
import { getSiteReviewSummary, saveSiteReviews } from '../../utils/siteReviews.js';
import {
  DialogBody,
  DialogCompany,
  DialogMessage,
  DialogReviewCount,
  DialogScore,
  BackToReviewsButton,
  WriteReviewButton,
} from './ModalAvaliacao.styles.js';
import { Icon } from '../Icon/Icon.jsx';

export function ModalAvaliacao({
  isOpen,
  onClose,
  companyName,
  siteReviews,
  onReviewsChange,
}) {
  const [screen, setScreen] = useState('reviews');
  const [isPersisted, setIsPersisted] = useState(true);
  const { averageRating, reviewCount } = getSiteReviewSummary(siteReviews);
  const hasReviews = reviewCount > 0;
  const reviewCountLabel = `${reviewCount} ${reviewCount === 1 ? 'avaliação' : 'avaliações'}`;
  const siteReviewCountLabel = reviewCount === 1
    ? '1 avaliação feita no site'
    : `${reviewCount} avaliações feitas no site`;
  const modalTitle = screen === 'form'
    ? 'Deixe sua avaliação'
    : screen === 'success'
      ? 'Avaliação cadastrada'
      : 'Resumo das avaliações';

  const handleClose = () => {
    setScreen('reviews');
    onClose();
  };

  const handleReviewSubmit = (formData) => {
    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const updatedReviews = [...siteReviews, newReview];
    setIsPersisted(saveSiteReviews(companyName, updatedReviews));
    onReviewsChange(updatedReviews);
    setScreen('success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
    >
      {screen === 'form' ? (
        <>
          <BackToReviewsButton type="button" onClick={() => setScreen('reviews')}>
            <Icon name="arrow" size={16} />
            Voltar às avaliações
          </BackToReviewsButton>
          <FormularioAvaliacao onSubmit={handleReviewSubmit} />
        </>
      ) : screen === 'success' ? (
        <DialogBody>
          <DialogCompany>Obrigado pela sua avaliação!</DialogCompany>
          {averageRating !== null && (
            <>
              <DialogScore>
                <Rating>{ratingFormatter.format(averageRating)}</Rating>
                <RatingStars rating={averageRating} />
              </DialogScore>
              <DialogReviewCount>Média do site · {reviewCountLabel}</DialogReviewCount>
            </>
          )}
          {!isPersisted && (
            <DialogMessage>
              Ela ficará disponível nesta sessão, mas o navegador não permitiu salvá-la para depois.
            </DialogMessage>
          )}
          <CardAvaliacao review={siteReviews[siteReviews.length - 1]} />
          <WriteReviewButton type="button" onClick={() => setScreen('reviews')}>
            Voltar às avaliações
          </WriteReviewButton>
        </DialogBody>
      ) : (
        <>
          <DialogBody>
            <DialogCompany>{companyName}</DialogCompany>
            {hasReviews ? (
              <DialogScore>
                <Rating>{ratingFormatter.format(averageRating)}</Rating>
                <RatingStars rating={averageRating} />
              </DialogScore>
            ) : (
              <DialogMessage>Esta empresa ainda não possui uma nota cadastrada.</DialogMessage>
            )}
            <DialogReviewCount>
              {hasReviews ? siteReviewCountLabel : '0 avaliações'}
            </DialogReviewCount>
          </DialogBody>

          <ListaDeAvaliacao reviews={siteReviews} />

          <WriteReviewButton type="button" onClick={() => setScreen('form')}>
            Escrever uma avaliação
          </WriteReviewButton>
        </>
      )}
    </Modal>
  );
}
