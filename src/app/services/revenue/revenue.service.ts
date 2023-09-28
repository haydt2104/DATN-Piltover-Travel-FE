import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenue } from 'src/app/models/revenue';
@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }

public getAllRevenue(): Observable<Revenue[]>{
    return this.http.get<Revenue[]>(this.baseUrl + "api/revenue/getAll");
}}
