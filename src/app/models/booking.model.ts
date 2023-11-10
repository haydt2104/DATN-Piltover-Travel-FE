import { Account } from './account.model';
import { Discount } from './discount.model';
import { TourDate } from './tour-date.model';

export interface Booking {
  id: number;
  createUser: Account;
  tourDate: TourDate;
  discount: Discount;
  totalPrice: number;
  totalPassengers: number;
  createTime: Date;
  updateUser: Account;
  updateTime: Date;
  status: number;
}
