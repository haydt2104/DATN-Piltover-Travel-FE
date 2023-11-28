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

  ngOnInit(): void {
    const userid=1234567890;
    this.getLisHistory(userid);
  }

  public ReadAllHistory(){
    this.BookingService.getHistoryReadAllAPI().subscribe((data:Booking[]) => {
      this.List=data;
      console.log('Data: ',data);
    }), (error) => {
      console.log('ReadAll fail', error);
    };
  }

  public getLisHistory(uid: number): void {

    this.HistoryService.getHistoryByAccAPI(uid).subscribe((data:Booking[]) => {
      this.List = data;
      console.log('Data:', data);
    }),
      (error) => {
        console.log('Loi', error);
      };
  }
}
