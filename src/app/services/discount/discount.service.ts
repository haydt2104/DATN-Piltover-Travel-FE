import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
