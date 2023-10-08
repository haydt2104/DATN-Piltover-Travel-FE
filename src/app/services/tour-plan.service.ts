import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourPlan } from '../models/tour-plan.model';

@Injectable({
  providedIn: 'root',
})
export class TourPlanService {
  constructor(private http: HttpClient) {}
  public getTourPlansByPlanID(tourId: number): Observable<TourPlan[]> {
    return this.http.get<TourPlan[]>(
      `http://localhost:8080/api/tour_plan?tourDateId=` + tourId
    );
  }
}
