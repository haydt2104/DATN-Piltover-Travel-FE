import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/models/booking.model';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public bookings!: Booking[];
  constructor(private bService: BookingService) {}

  ngOnInit() {
    // this.getAllBooking();
  }

  private getAllBooking() {
    this.bService.getAllBooking().subscribe((data) => {
      this.bookings = data;
      console.log(this.bookings);
    });
  }
}
