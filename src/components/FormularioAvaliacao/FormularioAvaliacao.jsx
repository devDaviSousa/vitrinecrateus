import { useState } from 'react';
import {
  FormField,
  FormLabel,
  RatingChoices,
  RatingChoice,
  ReviewFormContainer,
  SubmitReviewButton,
} from './FormularioAvaliacao.styles.js';

export function FormularioAvaliacao({ initialRating = 0, onSubmit, isSubmitting = false }) {
  const [rating, setRating] = useState(initialRating);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(rating);
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <FormField>
        <FormLabel>Sua nota</FormLabel>
        <RatingChoices role="radiogroup" aria-label="Escolha uma nota de 1 a 5 estrelas">
          {Array.from({ length: 5 }, (_, index) => {
            const stars = index + 1;
            return (
              <RatingChoice key={stars} $selected={stars <= rating}>
                <input
                  type="radio"
                  name="rating"
                  value={stars}
                  checked={rating === stars}
                  onChange={() => setRating(stars)}
                  required
                  aria-label={`${stars} ${stars === 1 ? 'estrela' : 'estrelas'}`}
                />
                <span aria-hidden="true">★</span>
              </RatingChoice>
            );
          })}
        </RatingChoices>
      </FormField>
      <SubmitReviewButton type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? 'Enviando...' : 'Salvar nota'}
      </SubmitReviewButton>
    </ReviewFormContainer>
  );
}
