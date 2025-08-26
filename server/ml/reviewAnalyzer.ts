// server/ml/reviewAnalyzer.ts

export interface Review {
  text: string;
  rating: number;
}

export function analyzeReviews(reviews: Review[]): number {
  // Basic placeholder: filter out suspected fake reviews
  const realReviews = reviews.filter(r =>
    !(r.text.includes("fake") || r.text.includes("spam"))
  );

  if (realReviews.length === 0) return 0;

  // Compute average rating from "real" reviews
  const avgRating =
    realReviews.reduce((sum, r) => sum + r.rating, 0) / realReviews.length;

  // Adjusted rating could also penalize suspicious patterns
  return Math.min(5, Math.max(0, avgRating));
}
