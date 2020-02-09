import { JwtService } from './../../../core/services/jwt.service';
import { LikeService } from './../../../core/services/like.service';
import { PostService } from 'src/app/core/services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/auth/auth/login/login.component';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit {
  @Input() post:IPost;
  likes;
  userId;
 toggle=false;
 dataLikes=[];
 isSubmited=false;
  constructor(
    private pS:PostService,
    private lS:LikeService,
    private jwS:JwtService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userId=this.jwS.getTokenId();
    this.dataLikes=this.post.likes;
    this.likes=this.post.likes.length;
   
    
    
  }
  toggleColor(){
    this.isSubmited=true;
    this.toggle=!this.toggle;
    this.userId=this.jwS.getTokenId();
    if(!this.userId){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      dialogConfig.data={type:"login"};
      //dialogConfig.restoreFocus=true;
      this.dialog.open(LoginComponent, dialogConfig);
      return;
    }

   
    if(this.dataLikes.length>0){
      // el.author==`/api/users/${this.userId}` && el.post==`/api/posts/${this.post.id}`
       if(this.dataLikes.find(el=>el===`/api/like_users/post=${this.post.id};author=${this.userId}`)!==undefined)
       {
         this.lS.removeLike(this.post.id,this.userId).subscribe(
           data=>{
           // this.likes--;
        
             this.dataLikes=this.dataLikes.filter(el=>el!=`/api/like_users/post=${this.post.id};author=${this.userId}`);
           
         //  this.dataLikes=this.dataLikes.filter(el=>el.author!==`/api/users/${this.userId}` && el.post!==`/api/posts/${this.post.id}`) 
          //    console.log(this.dataLikes);
             
          //  this.likes=this.dataLikes.length;
           this.isSubmited=false;
           
           },
           error=>{
         
         this.isSubmited=false;
       
         
           }
         )
       
         
    }
     else{

      this.lS.addLike(this.post.id,this.userId)
      .subscribe(data=>{
       // this.likes++;
       this.dataLikes.push(`/api/like_users/post=${this.post.id};author=${this.userId}`)
      
       this.isSubmited=false;

        
      },err=>{
       
         this.isSubmited=false;
      
      })
    }
  }else{
    this.lS.addLike(this.post.id,this.userId)
    .subscribe(data=>{
     // this.likes++;
     this.dataLikes.push(`/api/like_users/post=${this.post.id};author=${this.userId}`)
     
      this.isSubmited=false;
    
      
    },err=>{
     
      this.isSubmited=false;
    
    })
  }
    

    
    
  }

}
