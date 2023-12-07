import { BookingService } from 'src/app/services/booking/booking.service';
import { History } from './../../../../models/history.model';
import { Booking } from 'src/app/models/booking.model';
import { HistoryService } from './../../../../services/history/history.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  Historys: History[] = [];
  List:Booking[] = [];
  constructor(private HistoryService: HistoryService,private BookingService: BookingService) {}

  page: number = 0;
  itemsPerPage: number = 5;
  p: number = 1;

  ngOnInit(): void {
    this.getLisHistory();
  }

  public getLisHistory(): void {

    this.HistoryService.getHistoryByAccAPI().subscribe((data:Booking[]) => {
      this.List = data;
      console.log('Data:', data);
    }),
      (error) => {
        console.log('Loi', error);
      };
  }
}
