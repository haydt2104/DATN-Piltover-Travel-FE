import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from '../models/tour.model';

@Injectable({
  providedIn: 'root',
})
export class CurdService {
  url = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}
  public getList(object: string): Observable<any> {
    const url = `${this.url}/${object}/all`;
    return this.http.get<any>(url);
  }

  public post(object: string, data: any): Observable<any> {
    const url = `${this.url}/${object}`;
    return this.http.post<any>(url, data);
  }

  
}
