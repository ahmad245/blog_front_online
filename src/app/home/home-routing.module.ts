
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeAuthResolver } from './home/home-auth-resolver.service';

const routes:Routes =[
  {path:'',component:HomeComponent 
  // ,  resolve: {
  //   isAuthenticated: HomeAuthResolver
  // }
},
 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class HomeRoutingModule { }
