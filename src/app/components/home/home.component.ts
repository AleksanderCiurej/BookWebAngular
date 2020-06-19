import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Book} from '../../models/book';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllBooks().subscribe(
      response => {
        this.books = response as Book[];
        console.log(this.books);
      }
    );

  }

}
