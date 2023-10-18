import { Time } from '@angular/common';
import { TourPlan } from './tour-plan.model';

export interface TourPlanDetail {
  id: number;
  startTime: Time;
  endTime: Time;
  description: string;
  tourPlan: TourPlan;
}
