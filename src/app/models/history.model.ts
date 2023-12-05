import { Time } from '@angular/common';

export interface History {
  userID: number;
  fullname: string;
  bookingID: number;
  adult: number;
  children: number;
  bookDate: Date;
  bookingStatus: number;
  discountName: string;
  discountPercentage: number;
  discountCode: string;
  tourID: number;
  tourName: string;
  tourDescription: string;
  transportName: string;
  startDate: Date;
  startAddress: string;
  startTime: Time;
  endTime: Time;
  totalPrice: number;
}
