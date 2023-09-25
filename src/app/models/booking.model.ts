import { Account } from './account.model';
import { Tour } from "./tour.model";
import { Hotel } from './hotel.model';
import { Discount } from './discount.model';

export interface Booking {
  id: number;
  account:Account;
  tour:Tour;
  hotel:Hotel;
  discount:Discount;
  totalPrice: number;
  totalPassengers: number;
  status:number;
}
