import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Product,TopSelling} from './top-selling-data';
import { TourrevenueService } from 'src/app/services/revenue/tourrevenue.service';
import { Revenue, TourRevenue } from 'src/app/models/revenue';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TopSellingComponent implements OnInit {
  public TourRevenue!: TourRevenue[];
  currentSortColumn: keyof TourRevenue = 'total_name'; // Đặt giá trị ban đầu ở đây
  isDescendingOrder: boolean = false;
  topSelling:Product[];

  constructor(private tourService: TourrevenueService) {

    this.topSelling=TopSelling;
  }

  ngOnInit(): void {
      this.getAllTourRevenue();
  }
  private getAllTourRevenue(){
    this.tourService.getTourRevenue().subscribe((data) =>{
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
}

