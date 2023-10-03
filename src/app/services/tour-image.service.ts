import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TourImage } from "../models/tour-img.model";

@Injectable({
  providedIn: 'root',
})
export class TourImageService {
  constructor(private http: HttpClient) { }
  public getTourImageByTourId(id: number) {
    return this.http.get<TourImage[]>(`http://localhost:8080/api/tour_image?tourId=${id}`);
  }
}
