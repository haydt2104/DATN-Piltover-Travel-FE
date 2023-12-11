import { Component, OnInit } from '@angular/core';
import { TourDate } from './models/tour-date.model';
import { CurdService } from './services/curd.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Status } from './models/status.model';
import { TourDateService } from './services/tour/tour-date.service';
import { BookingService } from './services/booking/booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public tourDateList: TourDate[] = [];
  public statusList: Status[] = [];
  constructor(
    private curdService: CurdService,
    private tourDateService: TourDateService,
    private bookingService: BookingService,
    private httpClient: HttpClient
  ) { }

  currentDate = new Date();

  ngOnInit(): void {
    this.getAllStatus();
    setInterval(() => this.checkDate(), 30000);
  }

  public getTourDate() {
    this.curdService.getList("tour_date").subscribe(
      (response: TourDate[]) => {
        this.tourDateList = response;
        setInterval(() => this.autoUpdateTourDateStatus(), 1000)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  public getAllStatus() {
    this.curdService.getList('status').subscribe(
      (response) => {
        this.statusList = response;
        this.getTourDate();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public autoUpdateTourDateStatus() {
    for (var i = 0; i < this.tourDateList.length; i++) {
      var dateDif = this.getDateDiffer(this.tourDateList[i].initiateDate)
      if (dateDif < 7 && this.tourDateList[i].status.id == 1) {
        this.tourDateList[i].status = this.statusList.find(status => status.id == 3);
        this.tourDateService.putTourDate(this.tourDateList[i]).subscribe(
          (response) => {
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        )
      }
    }
  }
  public getDateDiffer(date: Date): number {
    var dateDif = Math.round(Number(new Date(date).getTime()) - Number(new Date().getTime())) / (24 * 60 * 60 * 1000)
    return dateDif
  }
  public checkDate() {
    if (this.currentDate.getDay() != (new Date()).getDay()) {
      this.bookingService.getOutDatedList().subscribe(
        (response: number[]) => {
          this.bookingService.editOutDated(response).subscribe(
            (response) => {
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          )
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    } else {
      this.currentDate = new Date();
    }
  }
}
