import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import { map ,  take } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      console.log('NoAuthGuard');
      
    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

  }
}