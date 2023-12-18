import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { ChangeInfo } from 'src/app/models/change-info.model';
import { Login } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }

  public login(userLogin: Login): Observable<any> {
    const loginUrl = `${this.baseUrl}api/auth/login`;

    return this.http.post(loginUrl, userLogin).pipe(
      map((response) => {
        // Xử lý dữ liệu ở đây nếu cần
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public signUp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/auth/sign-up`, data).pipe(
      map((response) => {
        // Xử lý dữ liệu ở đây nếu cần
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public logout(): Observable<any> {
    const logoutUrl = `${this.baseUrl}api/auth/logout`;

    return this.http.get(logoutUrl).pipe(
      map((response) => {
        // Xử lý dữ liệu ở đây nếu cần
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getInfoByEmail(email: string): Observable<any> {
    const logoutUrl = `${this.baseUrl}api/auth/getEmail/${email}`;

    return this.http.get(logoutUrl).pipe(
      map((response) => {
        // Xử lý dữ liệu ở đây nếu cần
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public changeInfo(data: ChangeInfo): Observable<any> {
    return this.http.put(`${this.baseUrl}api/auth/changeInfo`, data).pipe(
      map((response) => {
        // Xử lý dữ liệu ở đây nếu cần
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
