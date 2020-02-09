import { UserService } from './../../core/services/user.service';
import { IComment } from './../../core/models/comment';
import { CommentService } from './../../core/services/comment.service';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit,OnDestroy {
  subscription = new Subscription();
  @Input() comment:IComment;
  @Output() deleteComment = new EventEmitter<boolean>();
  live=true;
  canModify: boolean;
 
  constructor(
     private cS: CommentService,
    private route: ActivatedRoute,
    private uS:UserService
  ) { }

  ngOnInit() {

   this.subscription.add( this.uS.currentUser.subscribe((userData)=>{
 
    
      if(userData.roles){
        this.canModify=(userData.roles[0]==="ROLE_SUPERADMIN") || (userData.email === this.comment.author.email);
      }
      else{
        this.canModify = (userData.email === this.comment.author.email);
      }

    })
   );
   
  }
  
  deleteClicked() {
    this.deleteComment.emit(true);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
