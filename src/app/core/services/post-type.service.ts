
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpBackend}from '@angular/common/http';
import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
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
      return this.http2.get(this.rootUrl+'/api/blog_types').pipe(map(response=>response));
      // return this.gQLService.query(this.postTypeQuerie.allPostType(['name','id']))
      // .valueChanges.pipe(map(response=>response.data))
    }
    getById(id){
      // return this.gQLService.query(this.postTypeQuerie.postTypeById(['name']),{id})
    }
    post(name:string){
      return  this.http.post(this.rootUrl+'/api/blog_types',{name});
    
    }
  
  }
  
     