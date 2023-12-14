import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurdService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  public getList(object: string): Observable<any> {
    const url = `${this.baseUrl}api/${object}/all`;
    return this.http.get<any>(url);
  }

  public getSpecificObject(object: string, id: number): Observable<any> {
    const url = `${this.baseUrl}api/${object}/${id}`
    return this.http.get<any>(url);
  }

  public post(object: string, data: any): Observable<any> {
    const url = `${this.baseUrl}api/admin/${object}`;
    return this.http.post<any>(url, data);
  }

  public put(object: string, data: any): Observable<any> {
    const url = `${this.baseUrl}api/admin/${object}`;
    return this.http.put<any>(url, data);
  }
  public delete(object: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}api/admin/${object}/${id}`);
  }
}
