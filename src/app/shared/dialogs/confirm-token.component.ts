import { LoginComponent } from './../../auth/auth/login/login.component';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-confirm-token',
  templateUrl: './confirm-token.component.html',
  styleUrls: ['./confirm-token.component.scss']
})
export class ConfirmTokenComponent implements OnInit {
  createForm;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialog:MatDialogRef<ConfirmTokenComponent>,
  private uS:UserService,    
  public fb: FormBuilder, public dialogRef:MatDialogRef<ConfirmTokenComponent>,
  public dialogAuth: MatDialog,) 
  { 
     this.createForm=this.fb.group({
    _id:[''],

      confirmationToken:['',[Validators.required,Validators.minLength(1)]],
     
      
    });
}

ngOnInit() {
  console.log(this.data.type);
  ;
  // this._matFormField._control = this._control;
}
onClose(){
  this.dialogRef.close();
  this.createForm.reset();
 }
onSubmit(){

   let confirmationToken= this.createForm.value.confirmationToken;
    this.uS.confirmToken(confirmationToken).subscribe(
      res=>{
         this.onClose();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data={type:"login"};
    //dialogConfig.restoreFocus=true;
    this.dialogAuth.open(LoginComponent, dialogConfig);
      },
      err=>{
   console.log(err);
   
      }
    )
   console.log(confirmationToken);
   
    
  
 
}



  closeDialog(){
    this.dialog.close(false);
  }
}
