import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { BookingDetail } from 'src/app/models/bookingdetail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingdetailService {
  private API_Url:String = 'http://localhost:8080/api/booking/';
  constructor( private httpRequest: HttpClient,) { }

  getDataBookingByIdFromAPI(bId:number){
    return this.httpRequest.get(this.API_Url+'detail/'+bId);
  }

  //  getDataBookingByIdFromAPI(bId:number):Observable<BookingDetail[]> {
  //   return this.httpRequest.get<BookingDetail[]>(
  //     this.API_Url+'detail/'+bId
  //   );
  //  }
}


