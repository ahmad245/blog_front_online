import { take, map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthSuperAdminGuardService implements CanActivate {

  constructor(
    private uS: UserService,
    private router: Router,
  ) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot):Observable<boolean>  {

    return   this.uS.isSuperAdmin;
  
}
}
