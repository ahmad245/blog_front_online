
import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { IUser } from '..';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { HttpClient, HttpBackend } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isAdmindSubject = new BehaviorSubject<boolean>(false);
  public isAdmin = this.isAuthenticatedSubject.asObservable();


  private isSuperAdmindSubject = new BehaviorSubject<boolean>(false);
  public isSuperAdmin = this.isSuperAdmindSubject.asObservable();

  private isWriterdSubject = new BehaviorSubject<boolean>(false);
  public isWriter = this.isWriterdSubject.asObservable();

  private isUpdaterSubject = new BehaviorSubject<boolean>(false);
  public isUpdater = this.isUpdaterSubject.asObservable();

  private isDeleterSubject = new BehaviorSubject<boolean>(false);
  public isDeleter = this.isDeleterSubject.asObservable();

  readonly rootUrl="http://localhost:8080";
  private http2;
  constructor(
 
    private jwtService: JwtService,
    private http:HttpClient,
    private  handler: HttpBackend

  ) { 
    this.http2=new HttpClient(handler);
  }
  getUsersByFragment() {
    // return this.gQLService.query(this.userQuerie.allUsersByFragment);
  }
  
  getAll(page?, pageSize?){
    // return this.gQLService.query(this.userQuerie.allUser(['users{name roles{name id} id email isAdmin blogs{title}}','total']),{ page, pageSize})
    // .valueChanges.pipe(map(response => {
    //   return response
    // }))
  }
  getById(id) {
    // return this.gQLService.query(this.userQuerie.userById(['name']), { id })
  }
  getMe(id) {
   return this.http.get(this.rootUrl+'/api/users/'+id);
  }
  login(email, password) {
    return this.http2.post(this.rootUrl+`/api/login_check`,{username:email ,password})
  }
  signUp(firstName, lastName,email ,password,confirmPassword) {
     return this.http2.post(this.rootUrl+`/api/users`,{firstName, lastName,email ,password,confirmPassword})
  }
  confirmToken(confirmationToken){
    return this.http2.post(this.rootUrl+'/api/users/confirm',{confirmationToken:confirmationToken});
  }

  updateRoleUser(id,role,isAdmin){
    // return this.gQLService.mutate(this.userMutation.updateRoleUser,{id,role,isAdmin},
    //   (store,{data:{updateRoleUser}}) => {       
    //     const data: any = store.readQuery({
    //       query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total'])
    //     });
       
    //    data.users.users.push(updateRoleUser);

    //    store.writeQuery({ query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total']), data })
    //   }
    //   )
  }
  delete(id,page?, pageSize?){
    // return this.gQLService.mutate(this.userMutation.deleteUser,{id},
    //   (store,{data:{deleteUser}}) => {       
    //     const data: any = store.readQuery({
    //       query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total']),
    //       variables:{page,pageSize}
         
          
    //     });
    //     console.log(  deleteUser);
    //     data.users.users= data.users.users.filter(a=>a.id !== deleteUser.id);
    //     data.users.total--;
    //   console.log( data.users);
      

    //     store.writeQuery({ query: this.userQuerie.allUser(['users{name roles{name id} id email blogs{title}}','total']),variables:{page,pageSize}, data })
    //   });
  }
  /////////////////////////////////////////////////////////////////////

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.

  populate() {
    let userInf;
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getTokenId()) {
      userInf=this.jwtService.getTokenId();
      this.getMe(userInf).subscribe(
        response => {  
          this.setAuth(response)
         // console.log(response);
         },
          
          

        // data => this.setAuth(data.user),
        err => {
         console.log(err);
         
         this.purgeAuth()
        }
      );

    } else {

      //  Remove any potential remnants of previous auth states
     // this.purgeAuth();
    }
  }

  setAuth(user) {
    // Save JWT sent from server in localstorage
    let userInf;
    if (user.token) {
    
      this.jwtService.saveToken(user.token);
      this.jwtService.saveTokenId(user.id);
      userInf=this.jwtService.getUserPayload();
    }
    else if(user && this.jwtService.getUserPayload()){
      userInf=this.jwtService.getUserPayload();
    }
    // Set current user data into observable
    this.currentUserSubject.next(userInf);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);

    if (userInf.roles[0]==="ROLE_ADMIN" ||userInf.roles[0]==="ROLE_SUPERADMIN" ) {
      this.isAdmindSubject.next(true);
    }

    if (userInf.roles[0] === "ROLE_SUPERADMIN") {
     
      
      this.isSuperAdmindSubject.next(true);
    }

    if (userInf.roles[0] === "ROLE_WRITER" || userInf.roles[0] === "ROLE_SUPERADMIN") {
    
      this.isWriterdSubject.next(true);
    }

   else if (userInf.roles[0] === "ROLE_EDITOR" || userInf.roles[0] === "ROLE_SUPERADMIN") {
     
      this.isUpdaterSubject.next(true);
    }

  
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as IUser);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.isAdmindSubject.next(false);
    this.isWriterdSubject.next(false);
    this.isSuperAdmindSubject.next(false);
    this.isUpdaterSubject.next(false);
    this.isDeleterSubject.next(false);
  }

  attemptAuth(type, credentials)
   : Observable<any>
   {

   if (type === 'login') {
      return this.login(credentials.email, credentials.password).pipe(
        map(data => {
            
            
          if (data) this.setAuth(data); 
          return data;
        })
      )
    }
    else {
      console.log(credentials);
      
      return this.signUp(credentials.firstName, credentials.lastName, credentials.email, credentials.password, credentials.confirmPassword);
    }

  }

  getCurrentUser(): IUser {
    return this.currentUserSubject.value;
  }

}









// export class UserService extends Query<> {
//   userProperty=['id','name'];
//   id:'5d7fc84bd7ebcc3a60c6d8b5';
//   userQuery=gql`
//   query user($id:String!){
//    user(id:$id){
//   name
//    }
//   }`
//    constructor(private apollo:Apollo) {

//     }

//     getAll(id){
//       this.apollo.watchQuery({
//         query:this.userQuery
//         ,variables:{id:'5d7fc84bd7ebcc3a60c6d8b5'}
//       }).valueChanges
//       .subscribe((result)=>{
//         console.log(result.data);

//       });
//     }
//  }