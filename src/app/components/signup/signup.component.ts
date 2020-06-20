import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Md5} from 'ts-md5';
import {CreateUser} from '../../models/user';
import {Router} from '@angular/router';

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

  user: CreateUser;

  shouldShowError = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  create() {
    this.user = {
      name: this.credentials.name,
      surname: this.credentials.surname,
      email: this.credentials.email,
      password: Md5.hashStr(this.credentials.password) as string,
      admin: false
    };

    this.authService.addUser(this.user).subscribe((result) => {
      this.router.navigate(['/login']);
    }, error => {
      this.shouldShowError = true;
    });
  }


}
