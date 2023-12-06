import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DateRevenue,
  HotelRevenue,
  MonthRevenue,
  Revenue,
  TourRevenue,
  TransportRevenue,
} from 'src/app/models/revenue';
@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }

  public getAllRevenueBody(dateRange: DateRevenue): Observable<Revenue[]> {
    return this.http.post<Revenue[]>( this.baseUrl + 'api/admin/revenue/getAllRevenue', dateRange);
  }

  public getMonthRevenueBody(dateRange: DateRevenue):Observable<MonthRevenue[]> {
    return this.http.post<MonthRevenue[]>(this.baseUrl + 'api/admin/revenue/getAllMonthRevenue',dateRange);
  }

  public getTourRevenueBody(dateRange: DateRevenue): Observable<TourRevenue[]> {
    return this.http.post<TourRevenue[]>(this.baseUrl + 'api/admin/revenue/getTourRevenue', dateRange);
  }

  public getHotelRevenueBody(dateRange: DateRevenue): Observable<HotelRevenue[]> {
    return this.http.post<HotelRevenue[]>(this.baseUrl + 'api/admin/revenue/getHotelRevenue', dateRange);
  }

  public getTransportRevenueBody(dateRange: DateRevenue): Observable<TransportRevenue[]> {
    return this.http.post<TransportRevenue[]>(this.baseUrl + 'api/admin/revenue/getTransportRevenue', dateRange);
  }

}
