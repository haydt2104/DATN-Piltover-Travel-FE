import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { Revenue, HotelRevenue, DateRevenue } from 'src/app/models/revenue';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-hotel',
  templateUrl: './top-hotel.component.html',
  styleUrls: ['./top-hotel.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TopHotelComponent {
    public HotelRevenue!: HotelRevenue[];
    currentSortColumn: keyof HotelRevenue = 'hotel_name'; // Đặt giá trị ban đầu ở đây
    isDescendingOrder: boolean = false;
    public startDate: string = '2023-01-01'; // Ngày bắt đầu
    public endDate: string = '2023-12-31';   // Ngày kết thúc

    constructor(private hotelService: RevenueService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe((params: Params) => {
        this['startDate'] = params['startDate'] || '2023-01-01';
        this['endDate'] = params['endDate'] || '2023-12-31';
        // Thực hiện việc lọc dữ liệu dựa trên startDate và endDate ở đây
        this.getAllHotelRevenue();
      });
    }
      private getAllHotelRevenue(){
        const dateRange: DateRevenue = {
          startDate: this.startDate,
          endDate: this.endDate,
        };
        this.hotelService.getHotelRevenueBody(dateRange).subscribe((data) =>{
          this.HotelRevenue = data;
          console.log('Doanh thu Hotel: ', this.HotelRevenue);
        });
    }
      // Hàm sắp xếp dữ liệu theo cột
      sortBy(column: keyof HotelRevenue) {
        if (column === this.currentSortColumn) {
          // Đảo chiều sắp xếp nếu cột hiện tại đã được chọn
          this.HotelRevenue.reverse();
          this.isDescendingOrder = !this.isDescendingOrder;
        } else {
          // Sắp xếp dữ liệu theo cột mới
          this.HotelRevenue.sort((a, b) => {
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
