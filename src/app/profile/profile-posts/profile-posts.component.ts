import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { IPostConfig } from 'src/app/core/models/postConfig';
import { MatPaginator, PageEvent } from '@angular/material';
import { PostService } from 'src/app/core/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit ,OnDestroy{
  pageSize = 5;
  totalItem = 0;
  page = 1;
  id;
  pageSizeOptions = [1, 2, 5, 10, 25, 100];
  pagination=true;
  isLoading = true;
  search: any;
  @Input() postConfig: IPostConfig;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private pS: PostService,
    private route: ActivatedRoute,
    private jwtService: JwtService,
  ) { }
  type: string;
  posts: IPost[] = [];
  disable = true;
  subscription = new Subscription();

  ngOnInit() {
    this.id=+this.jwtService.getTokenId()
  
    if(this.id){
      console.log('true');
      
    this.subscription.add(  this.pS.getAllPostByUser(this.id,this.pagination, this.pageSize,this.page) 
      .subscribe((response) => {
        this.subscribePost(response)
        this.paginator.firstPage();
      })
    );
    }
    console.log('false');
    
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.page = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.totalItem = pageData.length;
    this.pS.getAllPostByUser(this.id,this.pagination, this.pageSize,this.page)
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