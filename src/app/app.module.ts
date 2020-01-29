import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

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
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  
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
// https://stackoverflow.com/questions/27810927/mongodb-data-structure-on-posts-comments-save-and-likes
// https://wrappixel.com/demos/angular-admin-templates/material-angular/material/dashboards/dashboard2
// https://demos.creative-tim.com/material-dashboard-angular2/#/dashboard
// https://github.com/syndesis/angular-graphql-demo/tree/master/src/app/api
// https://blog.mvp-space.com/authentication-and-authorization-boilerplate-with-apollo-2-0-part-3-ee69e60daa76
// https://github.com/KillerCodeMonkey/ngx-quill
// https://github.com/graphql/dataloader/blame/68a2a2e9a347ff2acc35244ae29995ab625b2075/README.md#L88
// https://itnext.io/angular-subjects-8ed5bf7c4f00
// https://netbasal.com/advanced-angular-implementing-a-reusable-autocomplete-component-9908c2f04f5
// https://forums.meteor.com/t/best-practices-for-optimization-of-regex-searches-on-server-side/30275/3
//https://medium.com/statuscode/how-to-speed-up-mongodb-regex-queries-by-a-factor-of-up-to-10-73995435c606
// https://udemy-certificate.s3.amazonaws.com/pdf/UC-CJ4PVX8U.pdf
// https://www.howtographql.com/angular-apollo/6-more-mutations-and-updating-the-store/
// https://www.graph.cool/docs/reference/graphql-api/query-api-nia9nushae/
// https://www.apollographql.com/docs/angular/features/caching/