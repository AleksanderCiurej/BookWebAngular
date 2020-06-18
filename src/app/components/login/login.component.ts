import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.authenticate({login : this.formGroup.value.login, password: this.formGroup.value.password});
  }
}
