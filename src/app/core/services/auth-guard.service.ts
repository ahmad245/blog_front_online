import { take, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private uS: UserService
  ) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): import("rxjs").Observable<boolean > {
     console.log('AuthGuardService');
     
      
    return this.uS.isAuthenticated.pipe(take(1));
  }
}
