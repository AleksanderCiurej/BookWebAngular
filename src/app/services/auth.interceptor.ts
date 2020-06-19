import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   if (localStorage.getItem('token') != null){
     request = request.clone({
       setHeaders: {
         Authorization: 'Bearer ' + localStorage.getItem('token'),
       }
     });
   }


   return next.handle(request);
  }
}
