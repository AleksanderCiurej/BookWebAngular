import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelper} from 'angular2-jwt';
import {Token} from '../models/token';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getAllUsers(){
    return this.http.get(this.url + 'api/users');
  }

  getUserById(id){
    return this.http.get(this.url + 'api/users/id/' + id);
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

  authenticate(credentials){
    return this.http.post(this.url + 'auth', {
      login: credentials.login,
      password: Md5.hashStr(credentials.password) as string
    }).pipe(
      map((result: Token) => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !(jwtHelper.isTokenExpired(token));
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return new JwtHelper().decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
