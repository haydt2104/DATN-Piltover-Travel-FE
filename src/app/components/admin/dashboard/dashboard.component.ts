import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  public startDate: string = '2023-01-01';
  public endDate: string = '2023-12-31';
  constructor(private router: Router) {
    this.subtitle = 'This is some text within a card block.';
  }
  filterData(dateRange: { startDate: string; endDate: string }): void {
    // Lấy thông tin về ngày bắt đầu và ngày kết thúc từ sự kiện
    this.startDate = dateRange.startDate;
    this.endDate = dateRange.endDate;

    // Thực hiện việc lọc dữ liệu dựa trên startDate và endDate ở đây
    // Gọi các hàm hoặc dịch vụ cần thiết để lọc dữ liệu
    this.router.navigate([], {
      queryParams: { startDate: this.startDate, endDate: this.endDate }
    });


  }
  ngAfterViewInit() { }
}
