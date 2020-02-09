import { LoginComponent } from './../../../auth/auth/login/login.component';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/auth/auth/auth.component';
import { IUser } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: IUser;
  constructor(
    public dialog: MatDialog,
    private uS: UserService,
  ) { }

  ngOnInit() {
   
    this.uS.currentUser.subscribe((user) => {
      this.currentUser = user;

    })
  }
  openDialog(type) {
  
    
    if(type==='register'){

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      dialogConfig.data={type:type};
      //dialogConfig.restoreFocus=true;
      this.dialog.open(AuthComponent, dialogConfig);
    }
    else{

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      dialogConfig.data={type:type};
      //dialogConfig.restoreFocus=true;
      this.dialog.open(LoginComponent, dialogConfig);
    }


  }

}
