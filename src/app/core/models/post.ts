import { IImages } from './image';
import { IPostType } from './post-type';
import { IUser } from './user';
import { IComment } from './comment';
import {  ITags } from './tag';

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
    comments?:IComment[];
    description: string,
    tags: ITags[],
    likes?:any[]
}