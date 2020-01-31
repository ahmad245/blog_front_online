import { IComment } from './../../core/models/comment';
import { IPost } from './../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, group, query, style, animate, stagger, animateChild, useAnimation } from '@angular/animations';
import { fadeInAnimation, bounceOutLeftAnimation } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h3', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('@todoAnimation',
            stagger(200, animateChild()),{optional:true})
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '2s'
          }
        })
      ]),
      transition(':leave', [
        style({ backgroundColor: '#ef5350' }),
        animate(500),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ])
  ]
})
export class PostComponent implements OnInit {
 post:IPost;
 postId;
 createForm;
 comments:IComment[]=[];
 isSubmitting = false;
 subscription = new Subscription();
 isLoading = true;
 pageSize = 5;
 totalItem = 0;
 page = 1;
 pagination=true;
 iter=1;
  constructor(
    private route:ActivatedRoute,
    private cS: CommentService,
    public fb: FormBuilder,
    public toastr:ToastrService,
  ) { 

    this.createForm=this.fb.group({
      _id:[''],
  
        message:['',[Validators.required,Validators.minLength(1)]],
       
      });
  }

  ngOnInit() {
   this.subscription.add(
      this.route.data.subscribe((data)=>{
      this.post=data.post;
     
      
    })
   );
    this.postId= this.route.snapshot.paramMap.get('id');
  this.subscription.add(  this.cS.getById(this.postId,this.pagination, this.pageSize,this.page).subscribe((data)=>{
       this.comments=data['hydra:member'];
       this.isLoading=false;
       this.totalItem=data['hydra:totalItems'];
       
       
    })
  )
  }
  addComment(){
    this.isSubmitting = true;
   let comment={
     message:this.createForm.value.message,
     post:this.postId
   }
   this.subscription.add(   this.cS.post(comment.message,comment.post).subscribe(
      (comment:IComment) => {
        this.comments.unshift(comment);
        this.createForm.reset('');
        this.isSubmitting = false;
        this.toastr.success('Votre matière a été créer avec succès.', 'Success');
      
        
      },
      errors => {
        this.isSubmitting = false;
        this.toastr.error(errors.message, 'Error occured');
      }
      )
   );
  }
  onDeleteComment(comment){
      
    this.cS.delete(comment.id).subscribe(  (commentData:IComment) => {
    this.comments=   this.comments.filter(el=>el.id!==comment.id)
     
      this.toastr.success('Votre suprime a été créer avec succès.', 'Success');
 
      
    },
    errors => {
     
      this.toastr.error(errors.message, 'Error occured');
    })
  }

  load(){
    this.isLoading=true;
     this.page=this.page+1;
    this.cS.getById(this.postId,this.pagination, this.pageSize,this.page).subscribe((data)=>{
      
     
      this.comments=[...this.comments,...data['hydra:member']];
      this.isLoading=false;

      
      
   })
  }
  
  animationStarted($event) { }
  animationDone($event) { }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
