import { Booking } from "./booking.model";

export interface BookingDetail {
    id: number;
    adult: number;
    children: number;
    surcharge: number;
    bookingTime: Date;
    booking: Booking
}
