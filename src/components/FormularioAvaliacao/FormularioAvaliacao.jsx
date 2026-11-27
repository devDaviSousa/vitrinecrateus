import { useState } from 'react';
import {
  FormError,
  FormField,
  FormInput,
  FormLabel,
  FormTextarea,
  RatingChoices,
  RatingChoice,
  ReviewFormContainer,
  SubmitReviewButton,
} from './FormularioAvaliacao.styles.js';

const emptyForm = { author: '', rating: 0, text: '' };

export function FormularioAvaliacao({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      author: form.author.trim(),
      rating: Number(form.rating),
      text: form.text.trim(),
    });
    setForm(emptyForm);
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <FormField>
        <FormLabel>Sua nota</FormLabel>
        <RatingChoices role="radiogroup" aria-label="Escolha uma nota de 1 a 5 estrelas">
          {Array.from({ length: 5 }, (_, index) => {
            const stars = index + 1;
            return (
              <RatingChoice key={stars} $selected={stars <= form.rating}>
                <input
                  type="radio"
                  name="rating"
                  value={stars}
                  checked={form.rating === stars}
                  onChange={() => setForm((current) => ({ ...current, rating: stars }))}
                  required
                  aria-label={`${stars} ${stars === 1 ? 'estrela' : 'estrelas'}`}
                />
                <span aria-hidden="true">★</span>
              </RatingChoice>
            );
          })}
        </RatingChoices>
      </FormField>
      <FormField>
        <FormLabel htmlFor="review-author">Seu nome</FormLabel>
        <FormInput
          id="review-author"
          name="author"
          autoComplete="name"
          value={form.author}
          onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
          maxLength={80}
          required
        />
      </FormField>
      <FormField>
        <FormLabel htmlFor="review-text">Sua avaliação</FormLabel>
        <FormTextarea
          id="review-text"
          name="text"
          value={form.text}
          onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
          placeholder="Conte como foi sua experiência"
          minLength={5}
          maxLength={1000}
          rows={4}
          required
        />
        <FormError>Máximo de 1.000 caracteres.</FormError>
      </FormField>
      <SubmitReviewButton type="submit">Enviar avaliação</SubmitReviewButton>
    </ReviewFormContainer>
  );
}
