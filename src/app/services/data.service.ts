import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
}
