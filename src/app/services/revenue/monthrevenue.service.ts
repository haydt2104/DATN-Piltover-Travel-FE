import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthRevenue, Revenue } from 'src/app/models/revenue';

@Injectable({
  providedIn: 'root'
})
export class MonthrevenueService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }
  public getMonthRevenue(): Observable<MonthRevenue[]>{
    return this.http.get<MonthRevenue[]>(this.baseUrl + "api/revenue/getMonthRevenue");
}}
