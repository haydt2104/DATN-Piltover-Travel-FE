import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourPlanDetail } from '../models/tour-plan-detail.entity';

@Injectable({
  providedIn: 'root',
})
export class TourPlanDetailService {
  constructor(private http: HttpClient) {}
  public getTourPlanDetailsByTourPlanId(planId: number): Observable<TourPlanDetail[]> {
    return this.http.get<TourPlanDetail[]>(
      `http://localhost:8080/api/tour_plan_detail?tourPlanId=` + planId
    );
  }
}
