import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { Discount } from 'src/app/models/discount.model';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  getDataDiscountFormAPI() {
    return this.http.get(this.baseUrl + 'api/discount/');
  }

  ReadAllDiscountsFromAPI(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/discount/getAll');
  }

  readOneDisountsFromAPI(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'api/discount/' + id);
  }
  //
  readOneDisountsFromAPI1(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'api/admin/discount/' + id);
  }
  ReadAllDiscountsFromAPI1(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/admin/discount/getAll');
  }
  //
  insertDiscount(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/admin/discount/insert`, data);
  }

  deleteDiscount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}api/admin/discount/delete/` + id);
  }

  updateDiscount(did: number, request: any): Observable<any> {
    const url = `${this.baseUrl}api/admin/discount/update/${did}`;
    return this.http.put(url, request);
  }

  active(did: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}api/admin/discount/active/${did}`)
  }

  checkDelete(id: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.baseUrl}api/admin/discount/checkd/` + id)
  }

  getDiscountByCode(code: string): Observable<Discount> {
    return this.http.get<Discount>(`${this.baseUrl}api/discountCode/${code}`);
  }
}
