import { Account } from './account.model';
import { TourDate } from './tour-date.model';
import { Hotel } from './hotel.model';
import { Discount } from './discount.model';

export interface Booking {
  id: number;
  createUser:Account;
  tourDate:TourDate;
  hotel:Hotel;
  discount:Discount;
  totalPrice: number;
  totalPassengers: number;
  createTime:Date;
  updateUser:Account;
  updateTime:Date;
  status: number;
}
