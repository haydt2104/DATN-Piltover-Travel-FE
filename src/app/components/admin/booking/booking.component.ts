import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  constructor(private bService: BookingService) {}

  ngOnInit() {
    this.getAllBooking();
  }

  getAllBooking() {
    this.bService.getDataBookingFromAPI().subscribe((data: Booking[]) => {
      this.bookings = data;
      console.log('Booking: ', this.bookings);
    });
  }
}
