import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent {
  @Output() dateRangeChanged = new EventEmitter<{ startDate: string; endDate: string }>();

  startDate: string = '2023-01-01';
  endDate: string = '2023-12-31';

  onFilterClick() {
    // Emit sự kiện để thông báo về sự thay đổi khoảng thời gian
    this.dateRangeChanged.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}
