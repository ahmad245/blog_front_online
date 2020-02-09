import { IRoles } from './../../core/models/roles';
import { IPost } from './../../core/models/post';
import { Component, OnInit, ContentChild, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { RolesComponent } from '../roles/roles.component';
import { DialogService } from 'src/app/core/services/dialog.service';

export interface PeriodicElement {
  name: string;
  blogs: IPost[];
  email: number;
  roles: IRoles;
 
}
@Component({
  selector: 'app-users-board',
  templateUrl: './users-board.component.html',
  styleUrls: ['./users-board.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersBoardComponent implements OnInit,OnDestroy {
  value = 'Search';
  displayedColumns:string[]=["firstName","lastName","email","roles","actions"];

  expandedElement: PeriodicElement | null;
 subscription=new Subscription();
 pageSize = 5;
  totalItem = 0;
  page = 1;
  pageSizeOptions = [1, 2, 5, 10, 25, 100];
  pagination=true;
  isLoading = true;
superAdmin="superAdmin";
  listData:MatTableDataSource<any>;
 
  @ViewChild('callAPIDialog', {static: false}) callAPIDialog: TemplateRef<any>;
  @ContentChild(MatSort,{ read: true, static: false }) sort: MatSort;
  @ContentChild(MatPaginator,{ read: true, static: false }) paginator: MatPaginator;
  constructor( public dialog:MatDialog,
    public toastr:ToastrService,
    public dialogService: DialogService,
    public uS:UserService,
    public pS:PostService,private router: Router,

    private route:ActivatedRoute
    ) {
    toastr.toastrConfig.positionClass= "toast-top-full-width";
   }

   ngOnInit() {
    if(this.uS.getCurrentUser().roles[0]!=='ROLE_SUPERADMIN')
    {
     this.router.navigateByUrl('/');
    }
    this.isLoading = true;
    this.uS.getAll(this.pagination, this.pageSize,this.page);
  this.subscription.add( this.uS.users.subscribe((data)=>{
        if(data){
          this.subscribeUser(this.uS.allUser)
        }
      })
  )
  }

  openDialog(){
  }  

  update(row){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data={user:row}
    // dialogConfig.data={type:type};
    //dialogConfig.restoreFocus=true;
    this.dialog.open(RolesComponent, dialogConfig);

    
  }

  delete(row) {
    this.dialogService.openDialog('are you sur to delete ?').afterClosed().subscribe((res) => {
      console.log(res);
      
      if (res) {
        this.uS.delete(row.id).subscribe(
                res => {
              
                this.toastr.success('Votre matière a été delete avec succès.', 'Success');
              },
              err => {
               
                this.toastr.error(err.message, 'Error occured');

              })
    
            }
    })

  }



  clear(){
    this.value='';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.value.trim().toLowerCase();
  }

  onChangePage(pageData: PageEvent) {
  
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.totalItem = pageData.length;
    this.uS.getAll(this.pagination, this.pageSize,this.page);
  this.subscription.add(  
    this.uS.users.subscribe((data)=>{
      if(data){
        this.subscribeUser(this.uS.allUser)
      }
    })
  )
  
  
  }

  subscribeUser(response) {
    console.log(response);
    this.listData = new MatTableDataSource(response["hydra:member"]);
    this.listData.sort = this.sort;
     this.totalItem = response["hydra:totalItems"];
    this.isLoading = false;
    
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
