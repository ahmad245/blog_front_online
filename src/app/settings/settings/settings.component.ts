import { JwtService } from './../../core/services/jwt.service';
import { IUser } from './../../core/models/user';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ResetPasswordComponent } from 'src/app/auth/auth/reset-password/reset-password.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  user: IUser;
  userId;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uS: UserService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private jwt:JwtService
  ) {
    this.createForm = this.fb.group({
      _id: [''],

      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit() {
    this.user = this.uS.getCurrentUser();
    this.userId=  this.jwt.getTokenId();
    
    if (this.user) {

      this.createForm.patchValue({
        _id: this.userId,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,

      })
    }

  }
  logout() {
    this.uS.purgeAuth();
    this.isSubmitting = false;
    this.router.navigateByUrl('/');
  }
  onSubmit() {
    this.isSubmitting = true;
    let user = {
      id: this.userId,
      firstName: this.createForm.value.firstName,
      email: this.createForm.value.email,
      lastName: this.createForm.value.lastName,
    }
    this.uS.put(user.id, user).subscribe((data) => {

      this.logout();

    })
  }
  openDialog() {
   
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { userId: this.userId };
    //dialogConfig.restoreFocus=true;
    this.dialog.open(ResetPasswordComponent, dialogConfig);

  }
}