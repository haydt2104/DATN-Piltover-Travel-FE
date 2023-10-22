import { Routes } from '@angular/router';
import { TourPlanDetailComponent } from './tour-plan-detail/tour-plan-detail.component';
import { TourPlanComponent } from './tour-plan/tour-plan.component';
import { TourComponent } from './tour.component';

export const TourRoutes: Routes = [
	{
		path: '',
		children: [
      {
        path: '',
        component: TourComponent
      },
      {
        path: 'date/:id',
        component: TourPlanComponent
      },
      {
        path: 'plan/:id',
        component: TourPlanDetailComponent
      }
		]
	}
];
