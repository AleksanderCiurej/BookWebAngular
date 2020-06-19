export interface Review {
  reviewId: number;
  bookId: number;
  userId: number;
  review: string;
}

export interface CreateReview {
  bookId: number;
  userId: number;
  review: string;
}
