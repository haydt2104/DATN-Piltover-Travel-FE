import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour.entity';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}
  public getTourList(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`http://localhost:8080/api/tour/all`);
  } 
}
