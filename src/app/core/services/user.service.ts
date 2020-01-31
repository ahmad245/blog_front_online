
import { Injectable } from '@angular/core';

import { BehaviorSubject, ReplaySubject, Observable, Subject, observable } from 'rxjs';
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

  public isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isAdmindSubject = new ReplaySubject<boolean>(1);
  public isAdmin = this.isAuthenticatedSubject.asObservable();


  private isSuperAdmindSubject = new ReplaySubject<boolean>(1);
  public isSuperAdmin = this.isSuperAdmindSubject.asObservable();

  private isWriterdSubject = new ReplaySubject<boolean>(1);
  public isWriter = this.isWriterdSubject.asObservable();

  private isUpdaterSubject = new ReplaySubject<boolean>(1);
  public isUpdater = this.isUpdaterSubject.asObservable();

  private isDeleterSubject = new ReplaySubject<boolean>(1);
  public isDeleter = this.isDeleterSubject.asObservable();

  readonly rootUrl="http://localhost:8080";
  private http2;
  public users=new  Subject<boolean>();
  allUser;
  constructor(
 
    private jwtService: JwtService,
    private http:HttpClient,
    private  handler: HttpBackend

  ) { 
    this.http2=new HttpClient(handler);
  }

  
  getAll(pagination?, itemsPerPage?,page?,search?){
    return this.http.get(this.rootUrl+`/api/users?pagination=${pagination}&itemsPerPage=${itemsPerPage}&_page=${page}&${search}`)
    .subscribe((data)=>{
     
      
       this.allUser=data;
       this.users.next(true);
    })
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
  signUp(firstName, lastName,email ,password,confirmPassword,roles?):Observable<any> {
    if(roles) return this.http2.post(this.rootUrl+`/api/users`,{firstName, lastName,email ,password,confirmPassword,roles})
    else return this.http2.post(this.rootUrl+`/api/users`,{firstName, lastName,email ,password,confirmPassword})
  }
  confirmToken(confirmationToken){
    return this.http2.post(this.rootUrl+'/api/users/confirm',{confirmationToken:confirmationToken});
  }

  updateRoleUser(id,role){
    return this.http.put(this.rootUrl+`/api/users/${id}/roles`,{roles:[role]});
  }
  
  getRoles(){
    return ['ROLE_COMMENTATOR','ROLE_WRITER','ROLE_EDITOR','ROLE_ADMIN','ROLE_SUPERADMIN']
  }
  delete(id){
    return this.http.delete(this.rootUrl+"/api/users/"+id);
  }
  put(id,user){
    return this.http.put(this.rootUrl+`/api/users/${id}`,{firstName:user.firstName,lastName:user.lastName,email:user.email});
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
        
          console.log(response);
          
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
       this.currentUserSubject.next(userInf);
    }
    else if(user && this.jwtService.getUserPayload()){
      userInf=this.jwtService.getUserPayload();
       this.currentUserSubject.next(user);
    }
    // Set current user data into observable
    
    // Set isAuthenticated to true
    else{
      this.currentUserSubject.next(user);
    }
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
    // this.jwtService.destroyTokenId();
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