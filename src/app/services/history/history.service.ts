import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { History } from 'src/app/models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public getHistoryByAccAPI(): Observable<any> {
    return this.http.get<Booking>(`${this.baseUrl}api/user/history/all`);
  }

  public getDetailHistory( id: number): Observable<History> {

    return this.http.get<History>(
      `${this.baseUrl}api/user/history?detail=${id}`
    );
  }
}
