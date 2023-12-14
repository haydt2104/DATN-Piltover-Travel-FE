import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/models/hotel.model';
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getAllHotel(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}api/hotel/all`);
  }

  public addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.baseUrl}api/admin/hotel`, hotel);
  }

  public editHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}api/admin/hotel`, hotel);
  }
}
