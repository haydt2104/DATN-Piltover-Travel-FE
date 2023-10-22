import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private API_Url: String = 'http://localhost:8080/api/';
  constructor(private httpRequest: HttpClient) {}

  getDataHotelFormAPI() {
    return this.httpRequest.get(this.API_Url + 'hotel/');
  }
}
