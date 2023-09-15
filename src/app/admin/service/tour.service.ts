import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tour {
  id: number;
  name: string;
  description: string;
  image: string;
  destinationAddress: string;
  availableSpaces: number;
  createTime: Date;
  active: boolean;
}

export interface TourPlan {
  id: number;
  startName: string;
  startAddress: string;
  startTime: Date;
  tour: Tour;
  transport: Transportation,
  status: Status
}

export interface TourPlanDetail {
  tourPlanDetailID: number;
  startTime: Date;
  endTime: Date;
  description: string;
  tourPlanId: number;
}

export interface Transportation {
  id: number;
  name: string;
  price: number;
  seatingCapacity: number;
}

export interface Status{
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}
  public getTourList(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`http://localhost:8080/api/tour/all`);
  }
  public getTourPlansByPlanID(tourId: number): Observable<TourPlan[]> {
    return this.http.get<TourPlan[]>(
      `http://localhost:8080/api/tour_plan?tourId=` + tourId
    );
  }
}
