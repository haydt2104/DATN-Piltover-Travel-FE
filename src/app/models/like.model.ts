import { Account } from "./account.model";
import { Post } from "./post.model";

export interface Like {
  id: number;
  acc:Account;
  post:Post;
  isLike:boolean
}
