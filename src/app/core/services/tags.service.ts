import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private http2;
  readonly rootUrl = "http://localhost:8080";
  constructor(
    private http: HttpClient,
    private handler: HttpBackend

  ) {
    this.http2 = new HttpClient(handler);
  }
  get(){
   return  this.http2.get(this.rootUrl+`/api/tags`);
  }
}
