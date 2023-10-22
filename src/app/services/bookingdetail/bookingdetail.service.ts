import { Booking } from 'src/app/models/booking.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
const baseUrl='http://localhost:8080/api/booking/';

@Injectable({
  providedIn: 'root'
})

export class BookingdetailService {
  private API_Url:String = 'http://localhost:8080/api/booking/';

  constructor( private httpRequest: HttpClient,) { }

  //cách 1:
  getDataBookingByIdFromAPI(bId:any){
    return this.httpRequest.get(this.API_Url+'detail/'+bId);
  }

  //cách 2:
   getDataBookingByIdFromAPI2(bId:any):Observable<BookingDetail> {
    return this.httpRequest.get<BookingDetail>(`${baseUrl}detail/${bId}`)
   }


}


