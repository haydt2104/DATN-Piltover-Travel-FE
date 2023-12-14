import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { TourImage } from "../../models/tour-img.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TourImageService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }
  public getTourImageByTourId(id: number): Observable<TourImage[]> {
    return this.http.get<TourImage[]>(`${this.baseUrl}api/tour_image?tourId=${id}`);
  }
}
