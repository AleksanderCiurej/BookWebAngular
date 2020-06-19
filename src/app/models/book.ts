export interface Book {
  bookId: number;
  title: string;
  author: string;
  year: number;
  publisher: string;
  cover: string;
}

export interface CreateBook {
  title: string;
  author: string;
  year: number;
  publisher: string;
  cover: string;
}
