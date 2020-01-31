import { Component, OnInit, ContentChild, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialogRef<LoginComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public toastr:ToastrService,
    public dialogRef:MatDialogRef<LoginComponent>,
    
    public fb: FormBuilder
  ) { 

    this.createForm=this.fb.group({
      _id:[''],
  
       
        email:['',[Validators.required,Validators.minLength(3),Validators.email]],
     
        password:['',[Validators.required,Validators.minLength(6)]],
  
      
        
      });
  }

  ngOnInit() {
   
  }
  onClose(){
    this.dialogRef.close();
    this.createForm.reset();
   }
  onSubmit(){
    let user={
      
        email:this.createForm.value.email,
        password:this.createForm.value.password,
       
    }
   this.subscription.add(
      this.uS.attemptAuth(this.data.type,user).subscribe(
        res => {
              
          this.toastr.success('Votre matière a été delete avec succès.', 'Success');
          this.onClose();
        },
        err => {
         
          this.toastr.error(err.message, 'Error occured');
    
        })
      )
   ;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}
