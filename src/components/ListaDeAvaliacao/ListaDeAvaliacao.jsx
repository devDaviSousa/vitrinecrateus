import { CardAvaliacao } from '../CardAvaliacao/CardAvaliacao.jsx';
import {
  ReviewList,
  SiteReviews,
  SiteReviewsTitle,
  EmptyReviews,
} from './ListaDeAvaliacao.styles.js';

export function ListaDeAvaliacao({ reviews }) {
  return (
    <SiteReviews>
      <SiteReviewsTitle>Avaliações feitas no site</SiteReviewsTitle>
      {reviews.length > 0 ? (
        <ReviewList>
          {reviews.map((review) => (
            <CardAvaliacao key={review.id} review={review} />
          ))}
        </ReviewList>
      ) : (
        <EmptyReviews>Ainda não há avaliações feitas no site.</EmptyReviews>
      )}
    </SiteReviews>
  );
}
