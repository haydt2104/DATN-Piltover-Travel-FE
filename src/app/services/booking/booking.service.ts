import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);

  }

  getAllBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/booking/getAllBookings');
  }
}
