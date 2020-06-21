import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../models/book';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  @Input() isAdmin: boolean;
  @Output() getBooks = new EventEmitter<boolean>();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  deleteBook() {
    this.dataService.deleteBook(this.book.bookId).subscribe(
      data => {
        this.getBooks.emit(true);
      }
    );
  }
}
