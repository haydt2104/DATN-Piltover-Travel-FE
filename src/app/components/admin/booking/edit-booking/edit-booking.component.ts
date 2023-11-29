import { Booking } from 'src/app/models/booking.model';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  FormControl,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
import { Discount } from 'src/app/models/discount.model';
import { Hotel } from 'src/app/models/hotel.model';
import { BookingdetailService } from 'src/app/services/bookingdetail/bookingdetail.service';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit {
  constructor(
    private API_route: ActivatedRoute,
    private detail: BookingdetailService,
    private hotel: HotelService,
    private discount: DiscountService,
    private FormBuilder: FormBuilder,
    private router: Router
  ) {}

  hotels!: Hotel[];
  discounts!: Discount[];
  detailItem!: BookingDetail;
  FormGroup:FormGroup;


  ngOnInit(): void {
    this.getDetailBooking(this.API_route.snapshot.params['id']);
    this.getDiscountList();
  }

  // setDetailItemData(){
  //   this.formDetailGroup = this.FormBuilder.group({
  //     id: [''],
  //     booking: {
  //       id: [''],
  //       account: {
  //         id: [''],
  //         email: [''],
  //         phone: [''],
  //         fullname: [''],
  //         birthday: [''],
  //         gender: [''],
  //         address: [''],
  //       },
  //       tourDate: {
  //         id: [''],
  //         tour: {
  //           id: [''],
  //           price: {
  //             id: [''],
  //             adultPrice: [''],
  //             childrenPrice: [''],
  //           },
  //           creator: {
  //             id: [''],
  //             email: [''],
  //             password: [''],
  //             phone: [''],
  //             fullname: [''],
  //             birthday: [''],
  //             gender: [''],
  //             address: [''],
  //           },
  //           name: [''],
  //           description: [''],
  //           destinationAddress: [''],
  //           active: true,
  //         },
  //         initiateDate: [''],
  //       },
  //       hotel: {
  //         id: [''],
  //         name: [''],
  //         price: [''],
  //         star: [''],
  //         address: [''],
  //       },
  //       discount: {
  //         id: [''],
  //         name: [''],
  //         percentage: [''],
  //         amount: [''],
  //         code: [''],
  //       },
  //       totalPrice: [''],
  //       totalPassengers: [''],
  //       status: [''],
  //     },
  //     adult: [''],
  //     children: [''],
  //     surcharge: [''],
  //     bookingTime: [''],
  //   });
  // }

  getDetailBooking(idBooking: number)  {
    this.detail
      .getDataBookingByIdFromAPI(idBooking)
      .subscribe((data: BookingDetail) => {
        this.detailItem = data;
        console.log('data: ', this.detailItem);

      }),
      (error) => {
        console.log(error);
      };
  }

  getDiscountList() {
    this.discount.getDataDiscountFormAPI().subscribe((data: Discount[]) => {
      this.discounts = data;
      console.log('dataDiscount: ', this.discounts);
    }),
      (error) => {
        console.log(error);
      };
  }

  // getHotelList() {
  //   this.hotel.getDataHotelFormAPI().subscribe((data: Hotel[]) => {
  //     this.hotels = data;
  //     console.log('dataHotel: ', this.hotels);
  //   }),
  //     (error) => {
  //       console.log(error);
  //     };
  // }
  // editBookingData(){
  //  alert('Booking data');
  // }

}
