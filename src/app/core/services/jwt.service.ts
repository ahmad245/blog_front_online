import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  getTokenId(): String {
    return window.localStorage['jwtTokenId'];
  }

  saveTokenId(token: String) {
    window.localStorage['jwtTokenId'] = token;
  }

  destroyTokenId() {
    window.localStorage.removeItem('jwtTokenId');
  }


  getUserPayload(){
    let token=this.getToken();
    if(token){
      let userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }
  }
  isLogin(){
    let userPayload=this.getUserPayload();
    if(userPayload){
      
      return userPayload.exp>Date.now()/1000;
    }
    else{
     return false;
   }
  }
}