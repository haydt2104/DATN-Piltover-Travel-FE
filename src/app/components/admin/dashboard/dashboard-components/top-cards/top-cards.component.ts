import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { Revenue } from 'src/app/models/revenue';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {
  public revenue: Revenue[] | null = null;
  topcards:topcard[];
  public startDate: string = '2023-01-01'; // Ngày bắt đầu
  public endDate: string = '2023-12-31';   // Ngày kết thúc

  constructor(private revenueService: RevenueService, private Router: Router, private route: ActivatedRoute,) {
    this.topcards=topcards;
  }

  ngOnInit(): void {
    this.getAllRevenue();
    this.route.queryParams.subscribe((params: Params) => {
      this['startDate'] = params['startDate'] || '';
      this['endDate'] = params['endDate'] || '';
      // Thực hiện việc lọc dữ liệu dựa trên startDate và endDate ở đây

      this.getAllRevenue();
    });
  }
  private getAllRevenue(){
    this.revenueService.getAllRevenue(this.startDate, this.endDate).subscribe((data) =>{
      this.revenue = data;
      console.log('Doanh thu: ', this.revenue);
    });
}
}
