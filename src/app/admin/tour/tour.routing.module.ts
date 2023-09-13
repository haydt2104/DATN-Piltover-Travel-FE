import { Routes } from '@angular/router';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';

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
      }
		]
	}
];
