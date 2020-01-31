import { ProfileModule } from './../profile/profile.module';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeAuthResolver } from './home/home-auth-resolver.service';




@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    ProfileModule,
    HomeRoutingModule
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule { }
