import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourDate } from '../models/tour-date.model';
@Injectable({
  providedIn: 'root',
})
export class TourDateService {
  constructor(private http: HttpClient) { }

  public getTourDateByTourId(id: number) {
    return this.http.get<TourDate[]>(`http://localhost:8080/api/tour_date?tourId=${id}`);
  }
}
