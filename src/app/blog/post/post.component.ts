import { UserService } from 'src/app/core/services/user.service';
import { IComment } from './../../core/models/comment';
import { IPost } from './../../core/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, group, query, style, animate, stagger, animateChild, useAnimation } from '@angular/animations';
import { fadeInAnimation, bounceOutLeftAnimation } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PostService } from 'src/app/core/services/post.service';

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
            stagger(200, animateChild()), { optional: true })
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
  post: IPost;
  postId;
  createForm;
  comments: IComment[] = [];
  isSubmitting = false;
  subscription = new Subscription();
  isLoading = true;
  pageSize = 5;
  totalItem = 0;
  page = 1;
  pagination = true;
  iter = 1;
  canModify:boolean;
  api = "http://localhost:8080";
  constructor(
    private route: ActivatedRoute,
    private cS: CommentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private pS: PostService,
    private router: Router,
    private uS:UserService
  ) {

    this.createForm = this.fb.group({
      _id: [''],

      message: ['', [Validators.required, Validators.minLength(1)]],

    });
  }

  ngOnInit() {
    this.subscription.add(
      this.route.data.subscribe((data) => {
        this.post = data.post;

      })

    );
    this.postId = this.route.snapshot.paramMap.get('id');
    this.subscription.add(this.cS.getById(this.postId, this.pagination, this.pageSize, this.page).subscribe((data) => {
      this.comments = data['hydra:member'];
      this.isLoading = false;
      this.totalItem = data['hydra:totalItems'];

    })
    )

    
   this.subscription.add( this.uS.currentUser.subscribe((userData)=>{
    if(userData.roles){
      this.canModify=(userData.roles[0]==="ROLE_SUPERADMIN" ) || (userData.email === this.post.author.email);
    }
    else{
      this.canModify = (userData.email === this.post.author.email);
    }

  })
 );

  }
  addComment() {
    this.isSubmitting = true;
    let comment = {
      message: this.createForm.value.message,
      post: this.postId
    }
    this.subscription.add(this.cS.post(comment.message, comment.post).subscribe(
      (comment: IComment) => {
        this.comments.unshift(comment);
        this.createForm.reset('');
        this.isSubmitting = false;


        this.toastr.success('Votre matière a été créer avec succès.', 'Success');


      },
      errors => {
        console.log(errors);
        this.isSubmitting = false;
        this.toastr.error(errors.message, 'Error occured');
      }
    )
    );
  }
  onDeleteComment(comment) {
    this.isSubmitting = true;
    this.cS.delete(comment.id).subscribe((commentData: IComment) => {
      this.comments = this.comments.filter(el => el.id !== comment.id)
      this.isSubmitting = false;
      this.toastr.success('Votre suprime a été créer avec succès.', 'Success');


    },
      errors => {
        this.isSubmitting = false;
        this.toastr.error(errors.message, 'Error occured');
      })
  }

  load() {
    this.isLoading = true;
    this.page = this.page + 1;
    this.cS.getById(this.postId, this.pagination, this.pageSize, this.page).subscribe((data) => {


      this.comments = [...this.comments, ...data['hydra:member']];
      this.isLoading = false;



    })
  }
  delete() {
    this.isSubmitting = true;
    console.log(this.postId);


    this.dialogService.openDialog('are you sur to delete ?').afterClosed().subscribe((res) => {


      if (res) {
        this.pS.delete(+this.postId).subscribe(
          res => {
            this.isSubmitting = false;
            this.toastr.success('Votre matière a été delete avec succès.', 'Success');
            this.router.navigateByUrl('/');
          },
          err => {
            this.isSubmitting = false;


            this.toastr.error(err.message, 'Error occured');

          })

      }
    })

  }


  animationStarted($event) { }
  animationDone($event) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
