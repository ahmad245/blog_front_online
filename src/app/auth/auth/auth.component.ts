import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ContentChild, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from 'src/app/core/services/dialog.service';


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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,public dialog:MatDialogRef<AuthComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private uS:UserService,
    public dialogRef:MatDialogRef<AuthComponent>,
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
        firstName:this.createForm.value.firstName,
        lastName:this.createForm.value.lastName,
        email:this.createForm.value.email,
        password:this.createForm.value.password,
        confirmPassword:this.createForm.value.confirmPassword,
    }
    this.uS.attemptAuth(this.data.type,user).subscribe((data)=>{
      console.log(data);
      if(data){
        this.onClose();

        this.dialogService.openConfirmDialog("please type confirm code ");
      }
       // this.dialogService.openDialog('are you sur to delete ?').afterClosed().subscribe((res) => {
    //   console.log(res);
      
    })
  }
 
}
