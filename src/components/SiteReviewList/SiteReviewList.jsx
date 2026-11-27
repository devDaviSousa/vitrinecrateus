import { SiteReviewCard } from '../SiteReviewCard/SiteReviewCard.jsx';
import {
  ReviewList,
  SiteReviews,
  SiteReviewsTitle,
} from './SiteReviewList.styles.js';

export function SiteReviewList({ reviews }) {
  if (reviews.length === 0) return null;

  return (
    <SiteReviews>
      <SiteReviewsTitle>Avaliações feitas no site</SiteReviewsTitle>
      <ReviewList>
        {reviews.map((review) => (
          <SiteReviewCard key={review.id} review={review} />
        ))}
      </ReviewList>
    </SiteReviews>
  );
}
