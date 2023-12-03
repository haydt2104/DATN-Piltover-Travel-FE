import { BookingDetail } from 'src/app/models/bookingdetail.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private API_Url: String = 'http://localhost:8080/api/';
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  getAllBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/booking/');
  }

  getBookingsByTourDate(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/booking' + `?tourDateId=${id}`);
  }

  getDataBookingFromAPI() {
    return this.http.get(this.API_Url + 'booking/');
  }

  getHistoryReadAllAPI() {
    return this.http.get(this.API_Url + 'history/');
  }

  cancelBooking(bid:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl + 'api/booking/cancel/'+bid);
  }
}
