import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/models/discount.model';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  private API_Url: String = 'http://localhost:8080/api/';
  constructor(private httpRequest: HttpClient) { }

  public getAllDiscount(): Observable<Discount[]> {
    return this.httpRequest.get<Discount[]>(`http://localhost:8080/api/discount/`);
  }

  getDataDiscountFormAPI() {
    return this.httpRequest.get(this.API_Url + 'discount/');
  }
}
