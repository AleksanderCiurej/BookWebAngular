import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../models/review';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  user = {
    name: '', surname: '', email: '', admin: false, userId: -1, password: ''
  };


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserById(this.review.userId).subscribe(data => {
      this.user = data as User;
    });
  }

}
