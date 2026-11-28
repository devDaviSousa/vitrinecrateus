import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { RatingStars, ratingFormatter } from '../RatingStars/RatingStars.jsx';
import { Rating } from '../RatingStars/RatingStars.styles.js';
import { FormularioAvaliacao } from '../FormularioAvaliacao/FormularioAvaliacao.jsx';
import { getMinhaAvaliacao, saveMyRating } from '../../services/avaliacoesService.js';
import { clearAccessToken, getAccessToken } from '../../services/api.js';
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

function getErrorMessage(error) {
  const responseMessage = error.response?.data?.error ?? error.response?.data?.message;
  if (typeof responseMessage === 'string') return responseMessage;
  if (typeof error.message === 'string') return error.message;
  return 'Tente novamente em instantes.';
}

export function ModalAvaliacao({
  isOpen,
  onClose,
  serviceId,
  companyName,
  classification,
  onClassificationChange,
}) {
  const [screen, setScreen] = useState('summary');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAccessToken()));
  const [myRating, setMyRating] = useState(null);
  const [isLoadingRating, setIsLoadingRating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');
  const averageRating = classification?.media ?? null;
  const reviewCount = classification?.quantidade ?? 0;
  const hasRating = Number.isFinite(averageRating);
  const reviewCountLabel = `${reviewCount} ${reviewCount === 1 ? 'avaliação' : 'avaliações'}`;

  useEffect(() => {
    if (!isOpen) return undefined;

    const token = getAccessToken();
    setIsAuthenticated(Boolean(token));
    setScreen('summary');
    setErrorMessage('');
    setNotice('');

    if (!token) {
      setMyRating(null);
      setIsLoadingRating(false);
      return undefined;
    }

    const controller = new AbortController();
    setMyRating(null);
    setIsLoadingRating(true);

    async function loadMyRating() {
      try {
        const rating = await getMinhaAvaliacao(serviceId, { signal: controller.signal });
        setMyRating(rating);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        if (requestError.response?.status === 401) {
          clearAccessToken();
          setIsAuthenticated(false);
          setErrorMessage('Sua sessão expirou. Entre novamente para avaliar.');
        } else {
          setErrorMessage(getErrorMessage(requestError));
        }
      } finally {
        if (!controller.signal.aborted) setIsLoadingRating(false);
      }
    }

    loadMyRating();
    return () => controller.abort();
  }, [isOpen, serviceId]);

  const goToLogin = () => {
    const returnTo = `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleRatingSubmit = async (rating) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setNotice('');

    try {
      const result = await saveMyRating(serviceId, rating);
      setMyRating(result.nota);
      onClassificationChange(result.classificacao);
      setScreen('summary');
      setNotice('Sua nota foi salva.');
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        clearAccessToken();
        setIsAuthenticated(false);
        setScreen('summary');
        setErrorMessage('Sua sessão expirou. Entre novamente para avaliar.');
      } else {
        setErrorMessage(getErrorMessage(requestError));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Classificação do serviço">
      <DialogBody>
        <DialogCompany>{companyName}</DialogCompany>
        {hasRating ? (
          <DialogScore>
            <Rating>{ratingFormatter.format(averageRating)}</Rating>
            <RatingStars rating={averageRating} />
          </DialogScore>
        ) : (
          <DialogMessage>Este serviço ainda não recebeu avaliações.</DialogMessage>
        )}
        <DialogReviewCount>{reviewCountLabel}</DialogReviewCount>

        {isAuthenticated && (
          <DialogReviewCount>
            {isLoadingRating
              ? 'Carregando sua nota...'
              : myRating === null
                ? 'Você ainda não avaliou este serviço.'
                : `Sua nota: ${myRating} de 5`}
          </DialogReviewCount>
        )}
      </DialogBody>

      {errorMessage && <DialogMessage role="alert">{errorMessage}</DialogMessage>}
      {notice && <DialogMessage role="status">{notice}</DialogMessage>}

      {screen === 'form' && isAuthenticated ? (
        <>
          <BackToReviewsButton
            type="button"
            onClick={() => {
              setScreen('summary');
              setErrorMessage('');
            }}
          >
            <Icon name="arrow" size={16} />
            Voltar
          </BackToReviewsButton>
          <FormularioAvaliacao
            key={myRating ?? 'new'}
            initialRating={myRating ?? 0}
            onSubmit={handleRatingSubmit}
            isSubmitting={isSubmitting}
          />
        </>
      ) : (
        <WriteReviewButton
          type="button"
          disabled={isLoadingRating}
          onClick={isAuthenticated ? () => setScreen('form') : goToLogin}
        >
          {isAuthenticated
            ? myRating === null
              ? 'Avaliar serviço'
              : 'Alterar minha nota'
            : 'Entrar para avaliar'}
        </WriteReviewButton>
      )}
    </Modal>
  );
}
