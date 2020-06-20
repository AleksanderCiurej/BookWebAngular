import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SignupComponent} from './components/signup/signup.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {BookItemComponent} from './components/book-item/book-item.component';
import {BookItemDetailComponent} from './components/book-item-detail/book-item-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './services/auth.interceptor';
import { CommentComponent } from './components/comment/comment.component';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    AddBookComponent,
    BookItemComponent,
    BookItemDetailComponent,
    CommentComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
