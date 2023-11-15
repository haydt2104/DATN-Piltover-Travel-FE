import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { TourDate } from 'src/app/models/tour-date.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { TourDateService } from 'src/app/services/tour/tour-date.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourDateService: TourDateService,
    private bookingService: BookingService
  ) { }

  tourDate: TourDate;
  bookingList: Booking[]

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (this.isAtobDecodable(params.data)) {
        var data: number = +atob(params.data);
        this.tourDateService.getTourDateById(data).subscribe(
          (responseTourDate: TourDate) => {
            this.bookingService.getBookingsByTourDate(data).subscribe(
              (responseBooking: Booking[]) => {
                this.bookingList = responseBooking
                console.log(this.getBookedCustomerNumber());

                if (this.getDateDiffer(responseTourDate.initiateDate) > 7 && responseTourDate.status.id == 2 && this.getBookedCustomerNumber() < responseTourDate.tour.availableSpaces) {
                  this.tourDate = responseTourDate
                } else {
                  this.router.navigate([''])
                }
              },
              (error: HttpErrorResponse) => {
                this.router.navigate([''])
              }
            )
          },
          (error: HttpErrorResponse) => {
            this.router.navigate([''])
          }
        )
      } else {
        this.router.navigate([''])
      }
    }
    )
  }

  isAtobDecodable(data: string): boolean {
    try {
      const decoded = atob(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  public getDateDiffer(date: Date): number {
    var dateDif = Math.round(Number(new Date(date).getTime()) - Number(new Date().getTime())) / (24 * 60 * 60 * 1000)
    return dateDif
  }

  public getBookedCustomerNumber(): number {
    return this.bookingList.reduce((sum, booking) => sum + booking.totalPassengers, 0)
  }
}
