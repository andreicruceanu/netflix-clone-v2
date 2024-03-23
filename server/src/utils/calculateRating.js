export const calculateRating = (reviews) => {
  const ratingStats = {
    totalReviews: reviews.length,
    rating:
      reviews.length > 0
        ? Number(
            (
              reviews.reduce((sum, reviews) => sum + reviews?.rating, 0) /
              reviews.length
            ).toFixed(2)
          )
        : 0,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
  };

  reviews.forEach((review) => {
    switch (review.rating) {
      case 5:
        ratingStats.star5 += 1;
        break;
      case 4:
        ratingStats.star4 += 1;
        break;
      case 3:
        ratingStats.star3 += 1;
        break;
      case 2:
        ratingStats.star2 += 1;
        break;
      case 1:
        ratingStats.star1 += 1;
        break;
      default:
        break;
    }
  });

  return ratingStats;
};
