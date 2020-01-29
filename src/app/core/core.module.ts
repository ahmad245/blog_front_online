import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ApiService } from './services/api.service';
import { HttpTokenInterceptor } from './intercepteors/http.token.interceptor.ts.service';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
 
  exports:[
   
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuardService,
    PostService,
     CommentService,
     UserService,

  ]
})
export class CoreModule { }
