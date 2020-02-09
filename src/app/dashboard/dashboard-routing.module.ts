import { CreateUserComponent } from './users-board/create-user/create-user.component';
import { UsersBoardComponent } from './users-board/users-board.component';
import { PostsBoardComponent } from './posts-board/posts-board.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTypesBoardComponent } from './post-types-board/post-types-board.component';
import { AuthSuperAdminGuardService } from '../core/services/auth-superAdmin-guard.service';
import { AuthAdminGuardService } from '../core/services/auth-admin-guard.service';

const routes:Routes=[
  {path:'',component:PostsBoardComponent,canActivate:[AuthAdminGuardService]},
  {path:'users',component:UsersBoardComponent,canActivate:[AuthSuperAdminGuardService]},
  {path:'postTypes',component:PostTypesBoardComponent,canActivate:[AuthAdminGuardService]},
  {path:'createUser',component:CreateUserComponent,canActivate:[AuthSuperAdminGuardService]},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }