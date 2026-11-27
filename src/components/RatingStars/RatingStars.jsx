import { Star, Stars } from './RatingStars.styles.js';

export const ratingFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function RatingStars({ rating }) {
  const hasRating = Number.isFinite(rating);

  return (
    <Stars aria-label={hasRating ? `${ratingFormatter.format(rating)} de 5 estrelas` : 'Sem nota disponível'}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} $filled={hasRating && index < Math.round(rating)} aria-hidden="true">
          ★
        </Star>
      ))}
    </Stars>
  );
}
