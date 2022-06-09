import { Document } from 'mongoose';

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUser extends IUserCredentials {
  name: string;
}

export interface IUserBody extends IUser {
  passwordConfirm: string;
}

export interface IToken {
  jwt: string;
}

export interface IUserEntity extends IUser, Document {
  token: IToken;
}
