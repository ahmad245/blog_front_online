import { Router,Event,NavigationStart,NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { PostTypeService } from './core/services/post-type.service';
import { PostService } from './core/services/post.service';
import { UserService } from './core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoadingIndicator = true;
  constructor(
    private uS: UserService,
     private pS: PostService,
      private pTS: PostTypeService,
      private router:Router
      ) {
     this.router.events.subscribe((routerEvent:Event)=>{
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }
     })
  }
  ngOnInit() {
    // this.pS.getPosts().subscribe((data)=>{
    //   console.log(data['hydra:member']);
      
    // })
   // this.uS.isAuthenticatedSubject.next(false);
    
   this.uS.populate();
  }
}
