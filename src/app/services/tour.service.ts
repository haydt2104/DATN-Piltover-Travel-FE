import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour.model';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) { }

  public getProvinceList() {
    return this.http.get('https://provinces.open-api.vn/api/p/');
  }

  public getDistrictList() {
    return this.http.get('https://provinces.open-api.vn/api/d/');
  }

  public getWardList() {
    return this.http.get('https://provinces.open-api.vn/api/w/');
  }

  public getTourList(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`http://localhost:8080/api/tour/all`);
  }
  public getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(`http://localhost:8080/api/tour/${id}`);
  }
}
