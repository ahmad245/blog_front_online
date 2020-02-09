import { UserService } from './../../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[appShowAdmin]'
})

export class AppShowAdminDirective implements OnInit {
    condition: boolean;
    @Input() set appShowAdmin(condition: boolean) {
        this.condition = condition;
    }
    
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private uS: UserService
    ) { }
    ngOnInit(): void {
        this.uS.isAdmin.subscribe((isAdmin) => {
           
            
            if (isAdmin && this.condition || !isAdmin && !this.condition) {
                this.viewContainer.createEmbeddedView(this.templateRef)
            }
            else {
                this.viewContainer.clear();
            }
        })
    }
}
