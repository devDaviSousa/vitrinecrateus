import { RatingStars } from '../RatingStars/RatingStars.jsx';
import { ReviewCard, ReviewMeta, ReviewText } from './SiteReviewCard.styles.js';

export function SiteReviewCard({ review }) {
  return (
    <ReviewCard>
      <ReviewMeta>
        <RatingStars rating={review.rating} />
        <span>{review.author}</span>
        {review.createdAt && <span>{new Date(review.createdAt).toLocaleDateString('pt-BR')}</span>}
      </ReviewMeta>
      <ReviewText>{review.text}</ReviewText>
    </ReviewCard>
  );
}
