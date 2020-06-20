import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../models/book';
import {Review} from '../../models/review';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'book-item-detail',
  templateUrl: './book-item-detail.component.html',
  styleUrls: ['./book-item-detail.component.css']
})
export class BookItemDetailComponent implements OnInit {
  id: number;
  book: Book;
  comments: Comment[];
  reviews: Review[];

  constructor(private dataService: DataService, public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.book = history.state.data;

    this.getData();

  }

  getData(){
    if (this.book == null){
      this.dataService.getBookById(this.id).subscribe(data => {
        this.book = data as Book;
      });
    }
    this.dataService.getCommentsForBookId(this.id).subscribe(data => {
      this.comments = data as Comment[];
    });

    this.dataService.getReviewForBookId(this.id).subscribe(data => {
      this.reviews = data as Review[];
    });
  }

}
