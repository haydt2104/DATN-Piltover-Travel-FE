import { Booking } from 'src/app/models/booking.model';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
const baseUrl = 'http://localhost:8080/api/booking/';

@Injectable({
  providedIn: 'root',
})
export class BookingdetailService {
  constructor(
    private httpRequest: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  //API stored "ReadDetailBooking"
  getDetailDataBookingByIdFromAPI(bid: number): Observable<BookingDetail> {
    return this.httpRequest.get<BookingDetail>(
      this.baseUrl + 'api/booking/detail/' + bid
    );
  }
}
