import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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
    );
  }

}
