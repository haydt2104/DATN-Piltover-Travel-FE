import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourRevenue, Revenue } from 'src/app/models/revenue';

@Injectable({
  providedIn: 'root'
})
export class TourrevenueService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }
  public getTourRevenue(): Observable<TourRevenue[]>{
    return this.http.get<TourRevenue[]>(this.baseUrl + "api/revenue/getTourRevenue");
}}

