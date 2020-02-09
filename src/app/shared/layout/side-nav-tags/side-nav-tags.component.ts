import { TagsService } from './../../../core/services/tags.service';
import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-side-nav-tags',
  templateUrl: './side-nav-tags.component.html',
  styleUrls: ['./side-nav-tags.component.scss']
})
export class SideNavTagsComponent implements OnInit {
 tagObject={};
 tagsFromResource=[];
 tags=[];

  constructor(
    private tS:TagsService,
    private pS:PostService
  ) { }

  ngOnInit() {
  this.tS.get().subscribe((data)=>{
   // this.tagsFromResource=data['hydra:member'];
    for (const tag of data['hydra:member']) {
      this.tagObject[tag.name]=(this.tagObject[tag.name]||0)+ 1; 
    }
    this.tagsFromResource=Object.keys(this.tagObject);
    this.tags=this.tagsFromResource.sort(this.compareFrequency.bind(this));
  
  })
  }
  compareFrequency(a, b) {
    return this.tagObject[b] - this.tagObject[a];
}
fetchBy(tag){
  
  this.pS.tag.next(tag);
  

}

}
