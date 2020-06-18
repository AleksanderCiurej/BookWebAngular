import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Token} from "../models/token";

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

  getAllUsers(){
    return this.http.get(this.url + 'api/users');
  }

  getUserById(id){
    return this.http.get(this.url + 'api/users/' + id);
  }

  addUser(user){
    return this.http.post(`${this.url}api/users/create`, user);
  }

  getUserByEmail(email){
    return this.http.get(this.url + 'api/users/email/' + email);
  }

  deleteUser(id){
    return this.http.delete(`${this.url}api/users/id/` + id);
  }

  banUser(id){
    return this.http.post(`${this.url}api/userBan/`, id);
  }

}
