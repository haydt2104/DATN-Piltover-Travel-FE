import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
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

  public getAllRevenue(
    startDate: string,
    endDate: string
  ): Observable<Revenue[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<Revenue[]>(this.baseUrl + 'api/revenue/getAll', {
      params,
    });
  }
  public getMonthRevenue(
    startDate: string,
    endDate: string
  ): Observable<MonthRevenue[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    return this.http.get<MonthRevenue[]>(
      this.baseUrl + 'api/revenue/getMonthRevenue',
      { params }
    );
  }

  public getTourRevenue(
    startDate: string,
    endDate: string
  ): Observable<TourRevenue[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<TourRevenue[]>(
      this.baseUrl + 'api/revenue/getTourRevenue',
      { params }
    );
  }

  public getHotelRevenue(
    startDate: string,
    endDate: string
  ): Observable<HotelRevenue[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<HotelRevenue[]>(
      this.baseUrl + 'api/revenue/getHotelRevenue',
      { params }
    );
  }

  public getTransportRevenue(
    startDate: string,
    endDate: string
  ): Observable<TransportRevenue[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<TransportRevenue[]>(
      this.baseUrl + 'api/revenue/getTransportRevenue',
      { params }
    );
  }
}
