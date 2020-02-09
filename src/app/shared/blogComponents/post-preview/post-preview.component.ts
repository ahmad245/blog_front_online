import { PostService } from 'src/app/core/services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
 @Input() post:IPost;
  constructor(private pS:PostService) { }

  ngOnInit() {

 
    
  }
  fetchBy(tag){
  
    this.pS.tag.next(tag);
    

  }

}
