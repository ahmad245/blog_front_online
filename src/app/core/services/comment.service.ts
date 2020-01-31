import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  readonly rootUrl="http://localhost:8080";
  private http2;
  constructor(
    private  handler: HttpBackend,
    private http:HttpClient,

    ) { 
      this.http2=new HttpClient(handler);}
  
    
    
    getById(id,pagination?, itemsPerPage?,page?){
     return    this.http2.get(this.rootUrl+`/api/posts/${id}/comments?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}`);
    }
    post(message,postId){
      return this.http.post(this.rootUrl+`/api/comments`,{message:message,post:`api/posts/${postId}`});
    }
    delete(id){
      return this.http.delete(this.rootUrl+"/api/comments/"+id)   }
  }
  