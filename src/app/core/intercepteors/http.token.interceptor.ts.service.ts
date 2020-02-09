import { Injectable } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor  {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    
    const headersConfig = {
       'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    if(req.headers.get('noauth'))
    {return next.handle(req.clone());}
    else{
      const request = req.clone({ setHeaders: headersConfig });
      return next.handle(request);
    }
   
  }
}