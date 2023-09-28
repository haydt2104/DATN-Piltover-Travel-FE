import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { Revenue } from 'src/app/models/revenue';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {
  public revenue!: Revenue[];
  topcards:topcard[];

  constructor(private revenueService: RevenueService) {
    this.topcards=topcards;
  }

  ngOnInit(): void {
    this.getAllRevenue();
  }
  private getAllRevenue(){
    this.revenueService.getAllRevenue().subscribe((data) =>{
      this.revenue = data;
      console.log('Doanh thu: ', this.revenue);
    });
}
}
