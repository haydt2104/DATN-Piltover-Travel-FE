import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('Base URL:', this.baseUrl);
  }

  public getAllAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.baseUrl + 'api/admin/account/getAllAccount')
      .pipe(
        map((response) => {
          // Xử lý dữ liệu ở đây nếu cần
          return response;
        }),
        catchError((error) => {
          // Xử lý lỗi ở đây
          console.error('Error:', error);
          return throwError(() => error);
        })
      );
  }

  public createAccount(accountData: Account): Observable<any> {
    return this.http
      .post(`${this.baseUrl}api/admin/account/createAccount`, accountData)
      .pipe(
        map((response) => {
          // Xử lý dữ liệu ở đây nếu cần
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  public getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(this.baseUrl + `api/admin/account/${id}`);
  }

  public getCurrentAccount(): Observable<Account> {
    return this.http.get<Account>(
      this.baseUrl + `api/admin/account/currentAccount`
    );
  }

  public blockAccount(id: number): any {
    return this.http.delete<any>(
      this.baseUrl + `api/admin/account/block/${id}`
    );
  }
}
