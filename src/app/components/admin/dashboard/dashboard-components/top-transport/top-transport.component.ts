import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import { DateRevenue, Revenue, TransportRevenue } from 'src/app/models/revenue';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-transport',
  templateUrl: './top-transport.component.html',
  styleUrls: ['./top-transport.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink,  CommonModule, NgxPaginationModule, FormsModule],
})
export class TopTransportComponent {

  public TransportRevenue!: TransportRevenue[];
  currentSortColumn: keyof TransportRevenue = 'transport_name'; // Đặt giá trị ban đầu ở đây
  isDescendingOrder: boolean = false;
  public startDate: string = '2023-01-01'; // Ngày bắt đầu
  public endDate: string = '2023-12-31';   // Ngày kết thúc
  currentPage = 1;
  originalTransportRevenue: TransportRevenue[] = [];

  constructor(private transportService: RevenueService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this['startDate'] = params['startDate'] || '2023-01-01';
      this['endDate'] = params['endDate'] || '2023-12-31';
      // Thực hiện việc lọc dữ liệu dựa trên startDate và endDate ở đây
      this.getAllTransportRevenue();
    });
  }
    private getAllTransportRevenue(){
      const dateRange: DateRevenue = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.transportService.getTransportRevenueBody(dateRange).subscribe((data) =>{
        this.TransportRevenue = data;
        this.originalTransportRevenue = data;
        this.filterTransport();
        console.log('Doanh thu Hotel: ', this.TransportRevenue);
      });
  }
    // Hàm sắp xếp dữ liệu theo cột
    sortBy(column: keyof TransportRevenue) {
      if (column === this.currentSortColumn) {
        // Đảo chiều sắp xếp nếu cột hiện tại đã được chọn
        this.TransportRevenue.reverse();
        this.isDescendingOrder = !this.isDescendingOrder;
      } else {
        // Sắp xếp dữ liệu theo cột mới
        this.TransportRevenue.sort((a, b) => {
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

    searchTransportName: string = '';

  // Hàm xử lý tìm kiếm
  searchTransport() {
    this.filterTransport();
  }
  searchFound: boolean = true;
  // Hàm lọc dữ liệu theo tên tour
  filterTransport() {
    if (this.searchTransportName.trim() === '') {
      this.TransportRevenue = [...this.originalTransportRevenue]; // Sử dụng spread operator để copy dữ liệu
    } else {
      this.TransportRevenue = this.originalTransportRevenue.filter(
        transport => transport.transport_name.toLowerCase().includes(this.searchTransportName.toLowerCase())
      );
    }
    if (this.TransportRevenue.length === 0) {
      console.log('Không tìm thấy tên Transport.');
    }
    this.searchFound = this.TransportRevenue.length > 0;
  }
}
