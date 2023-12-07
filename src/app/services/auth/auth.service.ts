import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
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
}
