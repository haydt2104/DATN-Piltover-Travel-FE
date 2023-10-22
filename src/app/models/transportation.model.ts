import { Account } from "./account.model";

export interface Transportation {//Add
  id: number;
  name: string;
  price: number;
  seatingCapacity: number;
  createUser:Account;
  createTime:Date;
  updateUser:Account;
  updateTime:Date;
}
