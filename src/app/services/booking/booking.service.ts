import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private API_Url: String = 'http://localhost:8080/api/';
  constructor(private httpRequest: HttpClient) {}

  getDataBookingFromAPI() {
    return this.httpRequest.get(this.API_Url + 'booking/');
  }

  editBooking(Booking: Booking) {
    return this.httpRequest.put(this.API_Url + '/edit', Booking);
  }

  getHistoryReadAllAPI(){
    return this.httpRequest.get(this.API_Url +'history/');
  }
}
