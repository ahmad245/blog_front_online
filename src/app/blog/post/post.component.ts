import { IComment } from './../../core/models/comment';
import { IPost } from './../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 post:IPost;
 comments:IComment[]=[];
  constructor(
    private route:ActivatedRoute,
    private cS: CommentService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.post=data.post;
      console.log( this.route);
      
    });
    let r= this.route.snapshot.paramMap.get('id');
    this.cS.getById(r).subscribe((data)=>{
       console.log(data['hydra:member']);
       this.comments=data['hydra:member'];
       
    })
  }

}
