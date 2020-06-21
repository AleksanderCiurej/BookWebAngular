import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Book} from '../../models/book';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[];
  admin = false;

  constructor(private dataService: DataService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.scrollToTop();
    if (this.authService.isLoggedIn()){
      this.authService.getUserByEmail(this.authService.currentUser.sub).subscribe(
        data => {
          const user = data as User;
          this.admin = user.admin;
        }
      );
    }
  }

  scrollToTop(){
    const button = document.querySelector('#scroll');
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }

  searchBook($event: Event) {
    if ((($event.target as HTMLInputElement).value) === ''){
      this.getAllBooks();
    }else{
      this.dataService.searchBook(($event.target as HTMLInputElement).value).subscribe(
        data => {
          this.books = data as Book[];
        }
      );
    }
  }

  getAllBooks(){
    this.dataService.getAllBooks().subscribe(
      response => {
        this.books = response as Book[];
      }
    );
  }
}
