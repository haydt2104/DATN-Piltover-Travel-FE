import { Booking } from './booking.model';
export interface BookingDetail {
  id: number;
  booking:Booking;
  adult:number;
  children:number;
  surcharge:number;
  bookingTime: Date;
}
