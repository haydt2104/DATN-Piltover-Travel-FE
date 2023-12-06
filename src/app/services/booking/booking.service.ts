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

  ReadAllBooking(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/admin/booking/all');
  }

  getBookingsByTourDate(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/admin/booking' + `?tourDateId=${id}`);
  }

  editBooking(Booking: Booking) {
    return this.http.put(this.baseUrl + 'api/admin/booking/edit', Booking);
  }

  cancelBooking(bid:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl + 'api/admin/booking/cancel/'+bid);
  }
}
