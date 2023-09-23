import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Account[]>(this.baseUrl + 'api/account/getAllAccount');
  }
}
