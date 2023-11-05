import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourDate } from '../../models/tour-date.model';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/models/hotel.model';
@Injectable({
    providedIn: 'root',
})
export class HotelService {
    constructor(private http: HttpClient) { }

    public getAllHotel(): Observable<Hotel[]> {
        return this.http.get<Hotel[]>(`http://localhost:8080/api/hotel/all`);
    }
}
