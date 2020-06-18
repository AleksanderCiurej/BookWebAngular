import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public credentials = {
    name: '',
    surname: '',
    email: '',
    password: '',
    admin: false
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  create() {
    this.authService.addUser(this.credentials).subscribe((result) => {
      return result;
    });
  }


}
