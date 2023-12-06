import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeTour, SearchTour, StartAddress } from 'src/app/models/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }

  public getAllHomeTour(): Observable<HomeTour[]> {
    return this.http.get<HomeTour[]>(this.baseUrl + 'api/home/all');
  }

  public createTour(newTour: SearchTour): Observable<HomeTour[]> {
    // Assuming 'path-to-search-tour' points to your SearchTour model
    return this.http.post<HomeTour[]>(this.baseUrl + 'api/home/createTour', newTour);
  }

  public getStartAddress(): Observable<StartAddress[]> {
    return this.http.get<StartAddress[]>(this.baseUrl + 'api/home/startAddress');
  }
}
