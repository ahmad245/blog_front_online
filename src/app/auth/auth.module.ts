import { NgModule } from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {SharedModule} from './../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './auth/login/login.component';



@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }