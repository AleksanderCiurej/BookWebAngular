import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {CreateReview, Review} from '../../models/review';
import {Comment, CreateComment} from '../../models/comment';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'book-item-detail',
  templateUrl: './book-item-detail.component.html',
  styleUrls: ['./book-item-detail.component.css']
})
export class BookItemDetailComponent implements OnInit {
  id: number;
  book: Book = {
    title: '', cover: '', year: 0, publisher: '', bookId: -1, author: ''
  };
  comments: Comment[];
  reviews: Review[];

  constructor(private dataService: DataService, public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.getData();

  }

  getData(){
    if (this.book.title === ''){
      this.dataService.getBookById(this.id).subscribe(data => {
        this.book = data as Book;
      });
    }
    this.getDataComments();
    this.getDataReviews();
  }

  getDataComments(){
    this.dataService.getCommentsForBookId(this.id).subscribe(data => {
      this.comments = data as Comment[];
    });
  }

  getDataReviews(){
    this.dataService.getReviewForBookId(this.id).subscribe(data => {
      this.reviews = data as Review[];
    });
  }


  onCommentAdded() {
    const elem = (document.getElementById('textAreaComment') as HTMLInputElement);
    const value = elem.value;
    elem.value = '';

    this.auth.getUserByEmail(this.auth.currentUser.sub).subscribe(data => {
      this.postComment(data as User, value);

    });


  }

  postComment(user: User, value: string){
    const createComment: CreateComment = {
      bookId: this.book.bookId, comment: value, userId: user.userId

    };
    this.dataService.createComment(createComment).subscribe(data => {
      this.getDataComments();
    });
  }

  onReviewAdded() {
    const elem = (document.getElementById('textAreaReview') as HTMLInputElement);
    const value = elem.value;
    elem.value = '';

    this.auth.getUserByEmail(this.auth.currentUser.sub).subscribe(data => {
      this.postReview(data as User, value);

    });
  }

  postReview(user: User, value: string){
    const createReview: CreateReview  = {
      bookId: this.book.bookId, review: value, userId: user.userId

    };
    this.dataService.createReview(createReview).subscribe(data => {
      this.getDataReviews();
    });
  }
}
