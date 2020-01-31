
import { Injectable } from '@angular/core';


import { QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(


  ) {}
  
    
    getAll(){
      // return this.gQLService.query(this.RolesQuerie.allRoles(['name','id']))
      // .valueChanges.pipe(map(response=>response.data))
    }
    getById(id){
      
    }
    // post(name:string){
    //  return this.gQLService.mutate(this.RolesMutaion.addRoles,{name}, 
    //   (store, { data: { addBlog_type } }) => {
    //   const data: any = store.readQuery({
    //     query:this.postTypeQuerie.allPostType(['name','id'])
    //   });
  
      
    //   data.blogTypes.push(addBlog_type);
  
    //   store.writeQuery({ query: this.postTypeQuerie.allPostType(['name','id']), data })
    // })
    // }
  
  }
  
     