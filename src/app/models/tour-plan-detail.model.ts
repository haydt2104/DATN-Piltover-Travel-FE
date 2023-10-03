import { TourPlan } from './tour-plan.model';

export interface TourPlanDetail {
  tourPlanDetailID: number;
  startTime: Date;
  endTime: Date;
  description: string;
  tourPlan: TourPlan;
}
