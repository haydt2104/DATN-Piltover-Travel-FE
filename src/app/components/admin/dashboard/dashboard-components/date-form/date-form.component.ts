import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent {
  @Output() dateRangeChanged = new EventEmitter<{ startDate: string; endDate: string }>();

  startDate: string = '';
  endDate: string = '';
  minEndDate: string;
  maxStartDate: String;

  updateDate() {
    if (this.startDate === this.endDate || new Date(this.startDate) > new Date(this.endDate)) {
      const adjustedEndDate = new Date(this.startDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
      this.endDate = adjustedEndDate.toISOString().split('T')[0];
    }
    if (this.startDate < '2023-01-01') {
      this.startDate = '2023-01-01';
    }
    if (this.endDate > '2023-12-31') {
      this.endDate = '2023-12-31';
    }
  }

  onFilterClick() {
    if (!this.startDate || !this.endDate) {
      // Hiển thị thông báo lỗi hoặc thực hiện hành động phù hợp với yêu cầu của bạn
      console.log('Vui lòng chọn cả ngày bắt đầu và kết thúc.');
      Swal.fire({
        icon: 'info',
        title: 'Chưa chọn ngày lọc',
        text: 'Vui lòng chọn ngày bắt đầu và kết thúc.',
    });
      return; // Ngăn không phát ra sự kiện khi thiếu thông tin
    } else
    // Emit sự kiện để thông báo về sự thay đổi khoảng thời gian
    this.dateRangeChanged.emit({ startDate: this.startDate, endDate: this.endDate });
  }

}
