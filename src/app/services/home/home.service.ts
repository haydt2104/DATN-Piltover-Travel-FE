import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeTour } from 'src/app/models/home.model';

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

  public getAllHomeTour(
  ): Observable<HomeTour[]> {
    return this.http.get<HomeTour[]>(this.baseUrl + 'api/home/all');
  }
}
