import { CardAvaliacao } from '../CardAvaliacao/CardAvaliacao.jsx';
import {
  ReviewList,
  SiteReviews,
  SiteReviewsTitle,
} from './ListaDeAvaliacao.styles.js';

export function ListaDeAvaliacao({ reviews }) {
  if (reviews.length === 0) return null;

  return (
    <SiteReviews>
      <SiteReviewsTitle>Avaliações feitas no site</SiteReviewsTitle>
      <ReviewList>
        {reviews.map((review) => (
          <CardAvaliacao key={review.id} review={review} />
        ))}
      </ReviewList>
    </SiteReviews>
  );
}
