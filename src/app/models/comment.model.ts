import { Account } from "./account.model";
import { Post } from "./post.model";

export interface Comment {
  id:number;
  acc:Account;
  post:Post;
  content:String
}
