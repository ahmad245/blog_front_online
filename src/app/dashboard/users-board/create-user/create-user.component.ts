import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validator/custom-validators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createForm;
  hide = true;
  authType: string = '';
  title: string = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  subscription = new Subscription();
  roles:any[]=[];
  constructor(
   
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public toastr:ToastrService,
    public dialogService: DialogService,
    
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
    console.log(user);
    
  this.subscription.add(  
    this.uS.signUp(user.firstName,user.lastName,user.email,user.password,user.confirmPassword)
    .subscribe( res => {
      this.isSubmitting=false;
      this.toastr.success('Votre matière a été delete avec succès.', 'Success');
    },
    err => {
      console.log(err);
      
      this.isSubmitting=false;
        
      this.toastr.error(err.message, 'Error occured');

    })
    )
  
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
