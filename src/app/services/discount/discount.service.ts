import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private API_Url: String = 'http://localhost:8080/api/';
  constructor(private httpRequest: HttpClient) {}

  getDataDiscountFormAPI() {
    return this.httpRequest.get(this.API_Url + 'discount/');
  }
}
