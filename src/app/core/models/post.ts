import { IImages } from './image';
import { IPostType } from './post-type';
import { IUser } from './user';
import { IComment } from './comment';

export interface IPost{
    id?:number;
    title:string;
    slug?:string;
    content?:string;
    publish?:boolean;
    author:IUser;
    images?:IImages;
    date:string;
    blogType?:IPostType;
    comments?:IComment;
}