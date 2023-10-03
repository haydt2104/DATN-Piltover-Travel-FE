import { Account } from './account.model';
import { TourDate } from "./tourdate.model";
import { Hotel } from './hotel.model';
import { Discount } from './discount.model';

export interface Booking {
  id: number;
  account:Account;
  tourDate:TourDate;
  hotel:Hotel;
  discount:Discount;
  totalPrice: number;
  totalPassengers: number;
  status:number;
}
