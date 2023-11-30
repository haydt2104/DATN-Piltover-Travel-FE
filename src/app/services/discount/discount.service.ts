import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/models/discount.model';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getDataDiscountFormAPI() {
    return this.http.get(this.baseUrl + 'api/discount/');
  }

  ReadAllDiscountsFromAPI(): Observable<any>{
    return  this.http.get(this.baseUrl+ 'api/discount/getAll');
  }

  readOneDisountsFromAPI(id:number): Observable<any>{
    return this.http.get(this.baseUrl+'api/discount/'+id);
  }

  insertDiscount(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.baseUrl}api/discount/insert`, data);
  }

  deleteDiscount(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}api/discount/delete/`+id);
  }
}
