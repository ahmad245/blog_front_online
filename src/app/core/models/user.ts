import { IComment } from './comment';
import { IPost } from 'src/app/core';
import { IRoles } from './roles';
export interface IUser{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
    posts?:IPost;
    comments?:IComment
    token?:string;
    roles?:any[];
}