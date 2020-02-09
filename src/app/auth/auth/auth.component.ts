import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ContentChild, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validator/custom-validators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialogRef<AuthComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public dialogRef:MatDialogRef<AuthComponent>,
    public dialogService: DialogService,
    public toastr:ToastrService,
  
    public fb: FormBuilder
  ) { 

    this.createForm=this.fb.group({
      _id:[''],
  
        firstName:['',[Validators.required,Validators.minLength(1)]],
        lastName:['',[Validators.required,Validators.minLength(1)]],
        email:['',[Validators.required,Validators.minLength(3),Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',Validators.required],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
     });
  }

  ngOnInit() {
   
  }
  onClose(){
    this.dialogRef.close();
    this.createForm.reset();
   }
  onSubmit(){
    this.isSubmitting=true;
    let user={
        firstName:this.createForm.value.firstName,
        lastName:this.createForm.value.lastName,
        email:this.createForm.value.email,
        password:this.createForm.value.password,
        confirmPassword:this.createForm.value.confirmPassword,
    }
  this.subscription.add(  this.uS.attemptAuth(this.data.type,user).subscribe(
    res => {
      this.isSubmitting=false;
      this.toastr.success('Votre matière a été delete avec succès.', 'Success');
      this.onClose();
      
      this.dialogService.openConfirmDialog("please type confirm code ");
    },
    err => {
      this.isSubmitting=false;
      this.toastr.error(err.message, 'Error occured');
  
    }
    )
  );
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
