import { IComment } from './../../core/models/comment';
import { CommentService } from './../../core/services/comment.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  subscription = new Subscription();
  @Input() comment:IComment;
  constructor(
     private cS: CommentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

   
   
  }

}
