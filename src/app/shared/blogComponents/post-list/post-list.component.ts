import { IPostConfig } from './../../../core/models/postConfig';
import { PostService } from './../../../core/services/post.service';
import { Component, OnInit, OnDestroy, Input, ContentChild, ViewChild } from '@angular/core';
import { IPost } from 'src/app/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  pageSize = 5;
  totalItem = 0;
  page = 1;
  pageSizeOptions = [1, 2, 5, 10, 25, 100];
  pagination=true;
  isLoading = true;
  search: any;
  @Input() postConfig: IPostConfig;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private pS: PostService,
    private route: ActivatedRoute,
  ) { }
  type: string;
  posts: IPost[] = [];
  disable = true;
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
    this.pS.search.pipe(
      switchMap(value => {
        this.isLoading=true;
        this.search = value;
        if(!value)return this.pS.getAll(this.pagination, this.pageSize,this.page) 
        else return this.pS.getAll(this.pagination, this.pageSize,this.page,`title=${value}`) 
        
      })
    ).subscribe((response) => {
      this.subscribePost(response)
      this.paginator.firstPage();
    })
    )


    this.subscription.add(
      this.route.queryParamMap.pipe(
          switchMap(param => {
            this.isLoading=true;
            this.type = param.get('type');
            if (!this.type) return this.pS.getAll(this.pagination, this.pageSize,this.page); 
            else return this.pS.getByType(this.type);
          })
        )
        
        .subscribe((response) => {
          this.subscribePost(response);
          this.paginator.firstPage();
        })
    );


  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.totalItem = pageData.length;
    this.pS.getAll(this.pagination, this.pageSize,this.page)
        .subscribe((response) => { this.subscribePost(response) })
    
    

  }
  subscribePost(response) {
      
      
       this.posts = response['hydra:member'];
    // this.posts = response.data.blogs.blogs;
     this.totalItem = response["hydra:totalItems"];
     this.isLoading = false;
    
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

// this.pS.search.subscribe((va) => {
//   this.search = va;
//   this.pS.getAll(this.page, this.pageSize, va)
//     .subscribe((response) => {
//       this.subscribePost(response)
//       this.paginator.firstPage();
//     })
// })


// if (this.search) {
    //   this.pS.getAll(this.page, this.pageSize, this.search) 
    //     .subscribe((response) => { this.subscribePost(response) })
    //   return;
    // }
    // if (this.type) {
    //   this.pS.getByType(this.type, this.page, this.pageSize)
    //     .subscribe((response) => { this.subscribePost(response) })
    //   return;
    // }
    // else {
    //   this.pS.getAll(this.page, this.pageSize)
    //     .subscribe((response) => { this.subscribePost(response) })
    // }