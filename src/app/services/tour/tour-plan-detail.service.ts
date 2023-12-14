import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TourPlanDetail } from '../../models/tour-plan-detail.model';

@Injectable({
  providedIn: 'root',
})
export class TourPlanDetailService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string
  ) { }
  public getTourPlanDetailsByTourPlanId(planId: number): Observable<TourPlanDetail[]> {
    return this.http.get<TourPlanDetail[]>(
      `${this.baseUrl}api/tour_plan_detail?tourPlanId=` + planId
    );
  }
}
