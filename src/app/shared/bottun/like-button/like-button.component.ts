import { PostService } from 'src/app/core/services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit {
  @Input() post:IPost;
 toggle=false;
  constructor(
    private pS:PostService
  ) { }

  ngOnInit() {
  }
  toggleColor(){
    // this.toggle=!this.toggle;
    // this.pS.favorite(this.post.id)
    // .subscribe((data)=>{
    //   console.log(data);
      
    // })
    
    
  }

}
