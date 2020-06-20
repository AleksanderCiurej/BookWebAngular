import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateComment} from '../models/comment';
import {CreateReview} from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getAllBooks(){
    return this.http.get(this.url + 'api/books');
  }

  addOrUpdateBook(book){
    return this.http.post(`${this.url}api/books`, book);
  }

  getBookById(id){
    return this.http.get(this.url + 'api/books/' + id);
  }

  deleteBook(id){
    return this.http.delete(`${this.url}api/books/` + id);
  }

  getCommentsForBookId(id: number){
    return this.http.get(this.url + 'api/comments/book/' + id);
  }

  getReviewForBookId(id: number){
    return this.http.get(`${this.url}api/reviews/book/${id}`);
  }

  createComment(comment: CreateComment){
    return this.http.post(`${this.url}api/comments`, comment);
  }

  createReview(review: CreateReview){
    return this.http.post(`${this.url}api/reviews`, review);
  }
}
