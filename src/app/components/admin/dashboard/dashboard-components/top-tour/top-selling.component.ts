import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Product,TopSelling} from './top-selling-data';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { Revenue, TourRevenue } from 'src/app/models/revenue';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule],
})
export class TopSellingComponent implements OnInit {
  public TourRevenue!: TourRevenue[];
  currentSortColumn: keyof TourRevenue = 'total_name'; // Đặt giá trị ban đầu ở đây
  isDescendingOrder: boolean = false;
  topSelling:Product[];
  public startDate: string = '2023-01-01'; // Ngày bắt đầu
  public endDate: string = '2023-12-31';   // Ngày kết thúc

  constructor(private tourService: RevenueService, private router: Router, private route: ActivatedRoute) {

    this.topSelling=TopSelling;
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params: Params) => {
        this.startDate = params['startDate'] || '2023-01-01';
        this.endDate = params['endDate'] || '2023-12-31';
        this.getAllTourRevenue();
      });
  }
  private getAllTourRevenue(){
    this.tourService.getTourRevenue(this.startDate, this.endDate).subscribe((data) =>{
      this.TourRevenue = data;
      console.log('Doanh thu Tour: ', this.TourRevenue);
    });
}
  // Hàm sắp xếp dữ liệu theo cột
  sortBy(column: keyof TourRevenue) {
    if (column === this.currentSortColumn) {
      // Đảo chiều sắp xếp nếu cột hiện tại đã được chọn
      this.TourRevenue.reverse();
      this.isDescendingOrder = !this.isDescendingOrder;
    } else {
      // Sắp xếp dữ liệu theo cột mới
      this.TourRevenue.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];
        if (aValue < bValue) return this.isDescendingOrder ? 1 : -1;
        if (aValue > bValue) return this.isDescendingOrder ? -1 : 1;
        return 0;
      });
      this.currentSortColumn = column;
    }
  }
  formatCurrency(value: number): string {
    const formattedValue = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);

    return formattedValue.replace('₫', '') + 'VNĐ';
  }
}

