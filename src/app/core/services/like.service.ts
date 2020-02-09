import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { retry, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  readonly rootUrl="http://localhost:8080";
  private http2;
  public likes=new  Subject<boolean>();
  public allLikes;
  constructor(
    private  handler: HttpBackend,
    private http:HttpClient,

    ) { 
      this.http2=new HttpClient(handler);}
   
      addLike(postId,userId){
        return  this.http.post(this.rootUrl+'/api/like_users',{ post:`api/posts/${postId}`,author:`api/users/${userId}`})
        
         
    }
    removeLike(postId,userId){
        return this.http.delete(this.rootUrl+`/api/like_users/post=${postId};author=${userId}`).pipe(retry(2),take(1)).pipe(retry(2),take(1));
    }
    checkLike(postId){
       return this.http.get(this.rootUrl+`/api/posts/${postId}/likes`);
    }
    getLike(postId){
        return this.http.get(this.rootUrl+`/api/posts/${postId}/likes`).pipe(retry(2),take(1));
    }
    }
   
