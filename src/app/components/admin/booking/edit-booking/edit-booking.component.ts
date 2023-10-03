import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  NgbDatepickerModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
import { BookingdetailService } from 'src/app/services/bookingdetail/bookingdetail.service';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit {
  constructor(
    private API_route: ActivatedRoute,
    private detail: BookingdetailService,
    private FormBuilder: FormBuilder
  ) {}

  detailItem!: BookingDetail;
  formGroup: FormGroup;

  ngOnInit(): void {
    this.getDetailBooking(this.API_route.snapshot.params['id']);


  }

  setDetailItemData(){
    this.formGroup = this.FormBuilder.group({
      id: [''],
      booking: {
        id: [''],
        account: {
          id: [''],
          email: [''],
          phone: [''],
          fullname: [''],
          birthday: [''],
          gender: [''],
          address: [''],
        },
        tourDate: {
          id: [''],
          tour: {
            id: [''],
            price: {
              id: [''],
              adultPrice: [''],
              childrenPrice: [''],
            },
            creator: {
              id: [''],
              email: [''],
              password: [''],
              phone: [''],
              fullname: [''],
              birthday: [''],
              gender: [''],
              address: [''],
            },
            name: [''],
            description: [''],
            destinationAddress: [''],
            active: true,
          },
          initiateDate: [''],
        },
        hotel: {
          id: [''],
          name: [''],
          price: [''],
          star: [''],
          address: [''],
        },
        discount: {
          id: [''],
          name: [''],
          percentage: [''],
          amount: [''],
          code: [''],
        },
        totalPrice: [''],
        totalPassengers: [''],
        status: [''],
      },
      adult: [''],
      children: [''],
      surcharge: [''],
      bookingTime: [''],
    });
  }

  getDetailBooking(idBooking: number) {
    this.detail
      .getDataBookingByIdFromAPI(idBooking)
      .subscribe((data: BookingDetail) => {
        this.detailItem = data;
        console.log('data: ',data);
      }),
      (error) => {
        console.log(error);
      };
  }

  updateBooking(bookingdetai:BookingDetail){

  }
}
