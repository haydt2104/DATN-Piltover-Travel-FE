import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutFailedComponent } from './checkout-failed/checkout-failed.component';

export const CheckoutRoutes: Routes = [
	{
		path: '',
		children: [
      {
        path: '',
        component: CheckoutComponent
      },
      {
        path: 'success',
        component: CheckoutSuccessComponent
      },
      {
        path: 'failed',
        component: CheckoutFailedComponent
      }
		]
	}
];
