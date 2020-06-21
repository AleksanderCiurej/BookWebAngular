import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Book, CreateBook} from '../../models/book';
import {Router} from '@angular/router';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    year: new FormControl(''),
    publisher: new FormControl(''),
    cover: new FormControl(''),
  });

  book: CreateBook;
  shouldShowError = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewBook(){
    if (this.formGroup.value.title === '' ||
      this.formGroup.value.author === '' ||
      this.formGroup.value.year === '' ||
      this.formGroup.value.publisher === ''
    ){
      document.getElementById('warning').style.display = 'block';
    }else{
      this.book = {
        title: this.formGroup.value.title,
        author: this.formGroup.value.author,
        year: this.formGroup.value.year,
        publisher: this.formGroup.value.publisher,
        cover: this.formGroup.value.cover
      };

      this.dataService.addOrUpdateBook(this.book).subscribe((result) => {
        this.router.navigate(['']);
      }, error => {
        this.shouldShowError = true;
      });
    }
  }

}
