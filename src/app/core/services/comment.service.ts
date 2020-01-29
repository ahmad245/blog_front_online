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
  
    
    // getAll():QueryRef<any>{
    //   return this.gQLService.query(this.commentQuerie.commentById(['title','id']))
    // }
    getById(id){
     return    this.http2.get(this.rootUrl+`/api/posts/${id}/comments`);
    }
  
  }
  