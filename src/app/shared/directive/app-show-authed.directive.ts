import { UserService } from './../../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appShowAuthed]'
})
export class AppShowAuthedDirective implements OnInit {
  condition:boolean;

  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef,
    private uS:UserService
  ) { }
  ngOnInit(): void {
  this.uS.isAuthenticated.subscribe((isAuthenticated)=>{
     console.log(isAuthenticated);
     console.log('isAuthenticated');
     
    if(isAuthenticated && this.condition || !isAuthenticated && !this.condition)
    {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
    else{
      this.viewContainer.clear();
    }
  })
  }
  @Input() set  appShowAuthed(condition:boolean){
    this.condition=condition;
   }

}
