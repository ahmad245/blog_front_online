import {HttpClient, HttpHeaders, HttpParams,HttpBackend }from '@angular/common/http';
import { IPost } from 'src/app/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';



// title,slug,description,text,isPublish,auther,imgUrl,blogTypeId

@Injectable({
  providedIn: 'root'
})
export class PostService {
  search = new Subject<string>();
  readonly rootUrl="http://localhost:8080";
  noAuthHeader={headers:new HttpHeaders({'NoAuth':'True',responseType: 'json'})}
  private http2;
  constructor(
    private http:HttpClient,
    private  handler: HttpBackend

  ) { 
    this.http2=new HttpClient(handler);
  }

   getPosts(pagination?, itemsPerPage?,search?){
     
   return this.http.get(this.rootUrl+`/api/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&${search}`,this.noAuthHeader);
   }

  getAll(pagination?, itemsPerPage?,page?,search?) {
    console.log(pagination,itemsPerPage,page,search);
    
    return this.http2.get(this.rootUrl+`/api/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}&${search}`);
  }
  getById(id){
    return this.http2.get(this.rootUrl+`/api/posts/${id}`);
  }

  getByType(id, pagination?, itemsPerPage?,page?) {
   return this.http2.get(this.rootUrl+`/api/blog_types/${id}/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}`);
  }
  
  post(title, slug, content, publish, images, blogType) {
   
   return this.http.post(this.rootUrl+'/api/posts',{title,slug,content,publish,images,blogType:`api/blog_types/${blogType}`});
  }

  put(id,title, slug, content, publish, images, blogType) {
  
    return this.http.put(this.rootUrl+'/api/posts/'+id,{title,slug,content,publish,images,blogType:`api/blog_types/${blogType}`});

  }



  delete(id) {
  return  this.http.delete(this.rootUrl+'/api/posts/'+id);
  }

  favorite(id){
    // return this.gQLService.mutate(this.postMutation.favorite, { id },
    //   (store, { data: { favorite } }) => {
    
    //     const data: any = store.readQuery({
    //       query: this.postQuerie.allPost(['blogs{title description favoritesCount auther user{ name id} id createdAt }', 'total']),

    //       variables: { page: 1, pageSize: 1 }
    //     });
    //     console.log(data);
        

    //    // data.blogs.blogs.push(favorite);

    //     //  data.blogs.total++
    //     store.writeQuery({ query: this.postQuerie.allPost(['blogs{title description auther user{ name id} id createdAt }', 'total']), variables: { page: 1, pageSize: 1 }, data })

    
    //   }
    // )
      
    //   ;

  }


}

  // blog{title description auther id createdAt user{ name id}