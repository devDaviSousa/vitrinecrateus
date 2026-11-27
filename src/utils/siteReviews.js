const STORAGE_PREFIX = 'site-reviews-v2:';

export function getSiteReviewsStorageKey(companyName) {
  return `${STORAGE_PREFIX}${companyName}`;
}

export function loadSiteReviews(companyName) {
  if (typeof window === 'undefined') return [];

  try {
    const savedReviews = window.localStorage.getItem(getSiteReviewsStorageKey(companyName));
    const parsedReviews = savedReviews ? JSON.parse(savedReviews) : [];

    if (!Array.isArray(parsedReviews)) {
      throw new TypeError('Saved reviews must be an array.');
    }

    return parsedReviews.filter((review) =>
      review
      && typeof review === 'object'
      && Number.isInteger(review.rating)
      && review.rating >= 1
      && review.rating <= 5
      && typeof review.author === 'string'
      && typeof review.text === 'string',
    );
  } catch (error) {
    console.error(`Não foi possível carregar as avaliações salvas de ${companyName}.`, error);
    return [];
  }
}

export function saveSiteReviews(companyName, reviews) {
  try {
    window.localStorage.setItem(
      getSiteReviewsStorageKey(companyName),
      JSON.stringify(reviews),
    );
    return true;
  } catch (error) {
    console.error(`Não foi possível salvar as avaliações de ${companyName}.`, error);
    return false;
  }
}

export function getSiteReviewSummary(reviews) {
  const ratings = reviews
    .map((review) => review.rating)
    .filter((rating) => Number.isInteger(rating) && rating >= 1 && rating <= 5);
  const ratingCount = ratings.length;
  const averageRating = ratingCount > 0
    ? ratings.reduce((total, rating) => total + rating, 0) / ratingCount
    : null;

  return { averageRating, reviewCount: ratingCount };
}
