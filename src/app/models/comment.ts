export interface Comment {
  commentId: number;
  bookId: number;
  userId: number;
  comment: string;
}

export interface CreateComment {
  bookId: number;
  userId: number;
  comment: string;
}
