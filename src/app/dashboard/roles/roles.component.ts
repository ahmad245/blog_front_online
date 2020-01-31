import { UserService } from 'src/app/core/services/user.service';
import { RolesService } from './../../core/services/roles.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  role = [];
  subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialogRef<RolesComponent>,
    public fb: FormBuilder,
    private rS: RolesService,
    private uS: UserService

  ) {
    this.createForm = this.fb.group({
      roles: [''],
      isAdmin: ['']
    });

  }

  ngOnInit() {
    if (this.data) {
    
      this.createForm.patchValue({
        roles: this.data.user.roles[0],

      })
    }


    this.role = this.uS.getRoles();
  }
  onClose() {
    this.dialog.close();
  }
  onSubmit() {
    let role = this.createForm.value.roles;
    this.uS.updateRoleUser(this.data.user.id, role).subscribe((data) => {
      console.log(data);
      this.uS.getAll();

    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
