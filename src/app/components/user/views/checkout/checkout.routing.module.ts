import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

export const CheckoutRoutes: Routes = [
	{
		path: '',
		children: [
      {
        path: '',
        component: CheckoutComponent
      }
		]
	}
];
