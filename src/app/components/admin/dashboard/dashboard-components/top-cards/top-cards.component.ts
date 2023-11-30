import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { DateRevenue, Revenue } from 'src/app/models/revenue';
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
    this.route.queryParams.subscribe((params: Params) => {
      this.startDate = params['startDate'] || '2023-01-01';
      this.endDate = params['endDate'] || '2023-12-31';
      // Thực hiện việc lọc dữ liệu dựa trên startDate và endDate ở đây
      this.getAllRevenueBody();
    });
  }

private getAllRevenueBody() {
  const dateRange: DateRevenue = {
    startDate: this.startDate,
    endDate: this.endDate,
  };

  this.revenueService.getAllRevenueBody(dateRange).subscribe((data) => {
    this.revenue = data;
    console.log('Doanh thu Body: ', this.revenue);
  });
}

formatCurrency(value: number): string {
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
  return formattedValue.replace('₫', '') + 'VNĐ';
}
calculateFontSize(value: number): number {
  // Tính toán kích thước phông chữ dựa trên độ dài của giá trị
  const textLength = value.toString().length;
  if (textLength <= 10) {
    return 22; // Kích thước phông chữ tối ưu
  } else {
    return 16; // Kích thước phông chữ thấp hơn cho văn bản dài hơn
  }
}
}

