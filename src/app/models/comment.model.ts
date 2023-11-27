import { Account } from "./account.model";
import { Post } from "./post.model";

export interface Comment {
  id:number;
  commentUser:Account;
  post:Post;
  commentTime: Date;
  updateTime: Date;
  content:String
}
