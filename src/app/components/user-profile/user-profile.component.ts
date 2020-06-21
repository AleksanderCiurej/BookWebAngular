import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {FormControl, FormGroup} from '@angular/forms';
import {Md5} from 'ts-md5';

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
    , error => console.log(error));
  }

  onSubmit() {
    const name = this.myForm.controls.name.value.trim();
    const surname = this.myForm.controls.surname.value.trim();
    const password = this.myForm.controls.password.value.trim();

    const createUser: User = {
      userId: this.user.userId,
      admin: false,
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      surname: this.user.surname
    };

    if (name === '' && surname === '' && password === '') {
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
      if (password !== ''){
        createUser.password = Md5.hashStr(password) as string;
        this.myForm.controls.password.setValue('');
      }
    }

    this.authService.updateUser(createUser).subscribe(data => {
      this.authService.getUserById(createUser.userId).subscribe(data => {
        this.user = data as User;
      }, error => console.log(error));
    }, error => console.log(error));

  }
}
