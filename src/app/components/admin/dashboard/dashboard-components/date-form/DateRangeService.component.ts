import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  private startDateSource = new BehaviorSubject<string>('');
  startDate$ = this.startDateSource.asObservable();

  private endDateSource = new BehaviorSubject<string>('');
  endDate$ = this.endDateSource.asObservable();

  constructor() {}

  setStartDate(startDate: string) {
    this.startDateSource.next(startDate);
  }

  setEndDate(endDate: string) {
    this.endDateSource.next(endDate);
  }
}
