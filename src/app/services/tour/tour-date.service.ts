import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourDate } from '../../models/tour-date.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TourDateService {
  constructor(private http: HttpClient) { }

  public getTourDateById(id: number): Observable<TourDate> {
    return this.http.get<TourDate>(`http://localhost:8080/api/tour_date/${id}`);
  }

  public getTourDateByTourId(id: number): Observable<TourDate[]> {
    return this.http.get<TourDate[]>(`http://localhost:8080/api/tour_date?tourId=${id}`);
  }

  public putTourDate(tourDate: TourDate) {
    return this.http.put(`http://localhost:8080/api/tour_date`, tourDate);
  }
}
