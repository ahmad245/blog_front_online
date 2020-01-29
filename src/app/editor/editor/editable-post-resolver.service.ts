import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import { catchError ,  map } from 'rxjs/operators';
import { IPost } from 'src/app/core';

@Injectable()
export class EditablePostResolver implements Resolve<IPost> {
  constructor(
    private pS: PostService,
    private router: Router,
    private uS: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.pS.getById(route.paramMap.get('id'))
      .pipe(
        map(
         ( post:any) => {
            if (this.uS.getCurrentUser().email === post.author.email) {
              return post;
            } else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}