import { Component, EventEmitter, Output } from '@angular/core';

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
    this.minEndDate = this.startDate;    this.maxStartDate = this.endDate;
  }

  onFilterClick() {
    // Emit sự kiện để thông báo về sự thay đổi khoảng thời gian
    this.dateRangeChanged.emit({ startDate: this.startDate, endDate: this.endDate });
  }

}
