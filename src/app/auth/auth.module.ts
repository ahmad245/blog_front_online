import { NgModule } from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {SharedModule} from './../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';



@NgModule({
  declarations: [AuthComponent, LoginComponent, ResetPasswordComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    NoAuthGuard
  ]
  ,
  entryComponents:[
    ResetPasswordComponent
  ]
})
export class AuthModule { }