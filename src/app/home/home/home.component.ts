import { UserService } from 'src/app/core/services/user.service';
import { IPostConfig } from './../../core/models/postConfig';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config:IPostConfig={};
  createForm;
  isSubmitting=false;
  isAuthenticated=false;
  constructor(
    private route:ActivatedRoute,
    public fb: FormBuilder,
    private uS:UserService
  ) { 
    this.createForm=this.fb.group({
 
  
        name:['',[Validators.required,Validators.minLength(1)]],
        
      });
  }
  

  ngOnInit() {
    
  }
}
