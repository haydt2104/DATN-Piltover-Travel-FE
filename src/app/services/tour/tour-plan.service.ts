import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourPlan } from '../../models/tour-plan.model';

@Injectable({
  providedIn: 'root',
})
export class TourPlanService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string
  ) { }

  public getTourPlans(): Observable<TourPlan[]> {
    return this.http.get<TourPlan[]>(
      `${this.baseUrl}api/tour_plan/all`
    );
  }

  public getTourPlansByDateID(tourId: number): Observable<TourPlan[]> {
    return this.http.get<TourPlan[]>(
      `${this.baseUrl}api/admin/tour_plan?tourDateId=` + tourId
    );
  }
}
