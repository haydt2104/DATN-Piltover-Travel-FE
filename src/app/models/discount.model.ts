export interface Discount {
  id?: number;
  name?: string;
  percentage?: number;
  amount?: number;
  code?: string;
  min:number;
  max:number;
  create_User:number
  isDelete:boolean;
}
