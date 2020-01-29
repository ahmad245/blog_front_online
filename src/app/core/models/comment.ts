import { IUser } from './user';

export interface IComment{
    id:number;
   

    message:string;

    author: IUser;
    date:string;
}