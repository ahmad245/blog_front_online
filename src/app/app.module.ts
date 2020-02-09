import { ProfileModule } from './profile';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';



import { environment } from '../environments/environment';



import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule}from "./material/material.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



import {SharedModule,HeaderComponent,FooterComponent}from './shared';

import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import {AuthModule  } from './auth/auth.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TimeagoModule } from 'ngx-timeago';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,FooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    HomeModule,
    MaterialModule,
    SharedModule,
    ProfileModule,
    ToastrModule.forRoot(),
    TimeagoModule.forRoot(),
  
  
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
{ provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  

  bootstrap: [AppComponent]
})
export class AppModule { }


// http://joeljoseph.net/angular-6-deploy-on-apache-server-by-solving-404-not-found-error-on-page-refresh/