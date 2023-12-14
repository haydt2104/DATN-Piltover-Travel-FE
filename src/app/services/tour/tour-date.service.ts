import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TourDate } from '../../models/tour-date.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TourDateService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string    
    ) { }

  public getTourDateById(id: number): Observable<TourDate> {
    return this.http.get<TourDate>(`${this.baseUrl}api/tour_date/${id}`);
  }

  public getTourDateByTourId(id: number): Observable<TourDate[]> {
    return this.http.get<TourDate[]>(`${this.baseUrl}api/tour_date?tourId=${id}`);
  }

  public putTourDate(tourDate: TourDate) {
    return this.http.put(`${this.baseUrl}api/tour_date`, tourDate);
  }
}
