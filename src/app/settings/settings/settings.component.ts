import { IUser } from './../../core/models/user';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  user:IUser;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public fb: FormBuilder
  ) {
    this.createForm=this.fb.group({
      _id:[''],
      
        firstName:['',[Validators.required,Validators.minLength(1)]],
        lastName:['',[Validators.required,Validators.minLength(1)]],
        email:['',[Validators.required,Validators.minLength(1)]],
      });
   }

  ngOnInit() {
    this.user= this.uS.getCurrentUser();
     console.log(this.user);
     if(this.user){

       this.createForm.patchValue({
        _id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
       
      })
     }
     
  }
  logout() {
    this.uS.purgeAuth();
    this.router.navigateByUrl('/');
  }
  onSubmit(){
    let user={
      id:this.user.id,
      firstName:this.createForm.value.firstName,
      email:this.createForm.value.email,
      lastName:this.createForm.value.lastName,
    }
    this.uS.put(user.id,user).subscribe((data)=>{
      console.log(data);
      this.logout();
      
    })
  }
}
