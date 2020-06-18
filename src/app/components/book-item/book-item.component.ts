import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  public items$: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.dataService.getAllBooks().subscribe(
      response => {
          this.items$ = response;
      }
    );
  }

}
