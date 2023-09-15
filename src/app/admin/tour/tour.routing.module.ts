import { Routes } from '@angular/router';
import { TourDetailPlanComponent } from './tour-detail-plan/tour-detail-plan.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
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
        path: 'details/:id',
        component: TourDetailComponent
      },
      {
        path: 'details/:id/plan/:id2',
        component: TourDetailPlanComponent
      }
		]
	}
];
