import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { SalesRatioComponent } from "./dashboard-components/sales-ratio/sales-ratio.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { TopSellingComponent } from "./dashboard-components/top-tour/top-selling.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { TopTransportComponent } from './dashboard-components/top-transport/top-transport.component';
import { TopHotelComponent } from './dashboard-components/top-hotel/top-hotel.component';
import { DateFormComponent } from './dashboard-components/date-form/date-form.component';


const routes: Routes = [
  {
		path: '',
    component: DashboardComponent,
		children: [
      {
        path: '',
        component: SalesRatioComponent, // Hiển thị DashboardComponent tại /admin/dashboard
      },
      {
        path: 'tour',
        component: TopSellingComponent
      },
      {
        path: 'hotel',
        component: TopHotelComponent
      },
      {
        path: 'transport',
        component: TopTransportComponent
      }
		]
	}
];

@NgModule({
  imports: [
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    SalesRatioComponent,
    FeedsComponent,
    TopCardsComponent,
    DateFormComponent,
  ],
})
export class DashboardModule {}
