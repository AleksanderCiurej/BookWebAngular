import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  user: User;
  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.comment.userId).subscribe(data => {
      this.user = data as User;
    })
  }

}
