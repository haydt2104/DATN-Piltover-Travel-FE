import { Like } from './like.model';
import { Account } from "./account.model";

export interface Post {
  id: number;
  createUser: Account;
  title: String;
  description: String;
  content: String;
  like: Like;
  comment: Comment;
  createTime: Date;
  status: Boolean;
  updateTime: Date;
  updateUser: Account;

  path: String;
}
