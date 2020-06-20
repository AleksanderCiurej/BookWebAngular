import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {CreateUser, User} from '../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  myForm: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
    }
  );

  user: User = {
    admin: false, email: '', name: '', password: '', surname: '', userId: 0
  };
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser(this.authService.currentUser.sub);
  }

  getUser(email){
    this.authService.getUserByEmail(email).subscribe(
      data =>
      {
        this.user = data as User;
      }
    ,error => console.log(error));
  }

  onSubmit() {
    const name = this.myForm.controls.name.value.trim();
    const surname = this.myForm.controls.surname.value.trim();
    const email = this.myForm.controls.email.value.trim();
    const password = this.myForm.controls.password.value.trim();

    const createUser: User = {
      userId: this.user.userId,
      admin: false,
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      surname: this.user.surname
    };

    if (name === '' && surname === '' && email === '' && password === '') {
      return;
    }else{
      if (name !== ''){
        createUser.name = name;
        this.myForm.controls.name.setValue('');
      }
      if (surname !== ''){
        createUser.surname = surname;
        this.myForm.controls.surname.setValue('');
      }
      if (email !== ''){
        createUser.email = email;
        this.myForm.controls.email.setValue('');
      }
      if (password !== ''){
        createUser.password = password;
        this.myForm.controls.password.setValue('');
      }
    }

    this.authService.updateUser(createUser).subscribe(data => {
      this.authService.getUserById(createUser.userId).subscribe(data => {
        this.user = data as User;
      }, error => console.log(error))
    }, error => console.log(error));

  }

  get checkEmail(){
    return this.myForm.get('email');
  }
}
