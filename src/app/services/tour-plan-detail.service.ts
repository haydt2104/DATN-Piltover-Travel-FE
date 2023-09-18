import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourPlanDetail } from './tour.data';

@Injectable({
  providedIn: 'root',
})
export class TourPlanDetailService {
  constructor(private http: HttpClient) {}
  public getTourPlanDetailsByTourPlanId(planId: number){
    return this.http.get<TourPlanDetail[]>(
      `http://localhost:8080/api/tour_plan_detail?tourPlanId=` + planId
    );
  }
}
