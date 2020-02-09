import { HttpClient, HttpHeaders, HttpParams, HttpBackend, HttpRequest } from '@angular/common/http';
import { IPost } from 'src/app/core';
import { map, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, pipe } from 'rxjs';

import { Injectable, Pipe } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class PostService {
  search = new Subject<string>();
  tag = new Subject<string>();
  readonly rootUrl = "http://localhost:8080";
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True', responseType: 'json' }) }
  private http2;
  constructor(
    private http: HttpClient,
    private handler: HttpBackend

  ) {
    this.http2 = new HttpClient(handler);
  }


  getAll(pagination?, itemsPerPage?, page?, search?) {

    return this.http2.get(this.rootUrl + `/api/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}&${search}`)
      .pipe(retry(2))
  }
  getAllPostByUser(id, pagination?, itemsPerPage?, page?, search?) {
    return this.http2.get(this.rootUrl + `/api/users/${id}/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}&${search}`)
      .pipe(retry(2))
  }
  getById(id) {
    return this.http2.get(this.rootUrl + `/api/posts/${id}`)
      .pipe(retry(2))
  }

  getByType(id, pagination?, itemsPerPage?, page?) {
    return this.http2.get(this.rootUrl + `/api/blog_types/${id}/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}`)
      .pipe(retry(2))
  }



  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }




  uplaodImg(fileData) {

    const formData = new FormData();
    formData.append('file', fileData)
    let r = { file: fileData }
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data;boundary=' + Math.random());
    headers.append('Accept', 'application/json');
    return this.http2.post(this.rootUrl + '/api/images', formData, headers,
      {
        reportProgress: true,
        observe: 'events'
      })
  }

  post(title, slug, content, publish, blogType,description,tags, images?) {
    if (images) return this.http.post(this.rootUrl + '/api/posts', { title, slug, content, publish, images: [`api/images/${images.id}`], blogType: `api/blog_types/${blogType}`,description,tags:tags })
    .pipe(retry(3))

    return this.http.post(this.rootUrl + '/api/posts', { title, slug, content, publish, blogType: `api/blog_types/${blogType}`,description,tags:tags });
  }

  put(id, title, slug, content, publish, blogType,description,tags, images?) {
    if (images) return this.http.put(this.rootUrl + '/api/posts/' + id, { title, slug, content, publish, images: [`api/images/${images.id}`], blogType: `api/blog_types/${blogType}`,description:description,tags:tags }).pipe(retry(2))
    return this.http.put(this.rootUrl + '/api/posts/' + id, { title, slug, content, publish, blogType: `api/blog_types/${blogType}`,description:description,tags:tags }).pipe(retry(2))

  }



  delete(id) {
    return this.http.delete(this.rootUrl + '/api/posts/' + id).pipe(retry(2));
  }

  favorite(id) {

  }

 async addTag(tag){
   let tags= await Promise.all(  tag.map(async(el)=>{
        return await  this.http.post(this.rootUrl+'/api/tags',{name:el}).toPromise();
      }))
      return tags;
   
  }

  getByTag(pagination?, itemsPerPage?, page?,tag?) {

    return this.http2.get(this.rootUrl + `/api/posts?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}&tags.name=${tag}`)
      .pipe(retry(2))
  }


}

  // blog{title description auther id createdAt user{ name id}