import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validator/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  subscription = new Subscription();
  userId;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialogRef<ResetPasswordComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public toastr:ToastrService,
    public dialogRef:MatDialogRef<ResetPasswordComponent>,
    
    public fb: FormBuilder
  ) { 
 
    this.createForm=this.fb.group({
      _id:[''],
  
       
      newPassword:['',[Validators.required,Validators.minLength(6)]],
     
      newRetypedPassword:['',[Validators.required,Validators.minLength(6)]],
      oldPassword:['',[Validators.required,Validators.minLength(6)]],
  
      
        
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidatorRest
     });
  }

  ngOnInit() {
    this.userId=this.uS.getCurrentUser();

    
  }
  onClose(){
    this.uS.purgeAuth();
    this.isSubmitting = false;
    this.dialogRef.close();
    this.createForm.reset();
    this.router.navigateByUrl('/');
   
   }
  
  onSubmit(){
    console.log(this.data);
    
    this.isSubmitting = true;
    let user={
     
      newPassword:this.createForm.value.newPassword,
      newRetypedPassword:this.createForm.value.newRetypedPassword,
      oldPassword:this.createForm.value.oldPassword,
       
    }
   this.subscription.add(
      this.uS.resetPassword(this.data.userId,user.newPassword,user.newRetypedPassword,user.oldPassword).subscribe(
        res => {
        
          
       
          this.toastr.success('Votre matière a été delete avec succès.', 'Success');
         
          this.onClose();
        },
        err => {
          this.isSubmitting = false;
          this.toastr.error(err.message, 'Error occured');
    
        })
      )
   ;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}
