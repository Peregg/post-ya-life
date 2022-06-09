import { IUser } from '@user/types';
import { Document } from 'mongoose';

export interface IPostBody {
  title: string;
  body: string;
  author: IUser;
}

export interface IPost extends IPostBody {
  id: string;
  status: string;
  createdAt: number;
};

export interface ITheme extends Document {
  name: string;
}

export interface IPopulatedPost extends IPost {
  author: IUser;
  theme: ITheme;
}
