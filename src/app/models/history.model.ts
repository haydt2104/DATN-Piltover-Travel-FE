import { Time } from '@angular/common';

export interface History {
  userID: number;
  fullname: string;
  bookingID: number;
  adult: number;
  children: number;
  book_date: Date;
  booking_status: number;
  discount_name: string;
  discount_percentage: number;
  discount_code: string;
  tour_ID: number;
  tour_name: string;
  tour_description: string;
  transport_name: string;
  start_date: Date;
  start_address: string;
  start_time: Time;
  end_time: Time;
  total_price: number;
}
