import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';
import { Discount } from 'src/app/models/discount.model';

@Injectable({
    providedIn: 'root',
})
export class DiscountService {
    constructor(private http: HttpClient) {
    }

    public getAllDiscount(): Observable<Discount[]> {
        return this.http.get<Discount[]>(`http://localhost:8080/api/discount/`);
    }
}
