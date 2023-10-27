import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  getAllBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/booking/getAllBookings');
  }

  getBookingsByTourDate(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/booking' + `?tourDateId=${id}`);
  }
}
