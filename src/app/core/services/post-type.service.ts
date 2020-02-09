
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpBackend}from '@angular/common/http';

import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostTypeService {
  readonly rootUrl="http://localhost:8080";
   private http2;
  constructor(
    private http:HttpClient,
    private  handler: HttpBackend,
   

  ) {

    this.http2=new HttpClient(handler);
  }
  
    
    getAll(){
      return this.http2.get(this.rootUrl+'/api/blog_types').pipe(map(response=>response))
      .pipe(retry(2));
     
    }
    getById(id){
      
    }
    post(name:string){
      return  this.http.post(this.rootUrl+'/api/blog_types',{name});
    
    }
  
  }
  
     