import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { Account } from 'src/app/models/account.model';
import { Booking } from 'src/app/models/booking.model';
import { Hotel } from 'src/app/models/hotel.model';
import { TourDate } from 'src/app/models/tour-date.model';
import { TourImage } from 'src/app/models/tour-img.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { TourDateService } from 'src/app/services/tour/tour-date.service';
import { TourImageService } from 'src/app/services/tour/tour-image.service';
import { AccountService } from './../../../../services/account/account.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { Discount } from 'src/app/models/discount.model';
import { InputTextModule } from 'primeng/inputtext';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BookingDetail } from 'src/app/models/booking-detail.model';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    CarouselModule,
    RadioButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourDateService: TourDateService,
    private bookingService: BookingService,
    private tourImageService: TourImageService,
    private hotelService: HotelService,
    private accountService: AccountService,
    private discountService: DiscountService,
    private messageService: MessageService,
    private httpClient: HttpClient
  ) { }
  responsiveOptions: any[] | undefined;

  currentUser: Account;
  tourDate: TourDate;
  tourImageList: TourImage[] = [];
  bookingList: Booking[] = [];
  hotelList: Hotel[] = []
  discountList: Discount[] = [];

  adult: number
  children: number
  subTotal: number = 0
  discount: Discount = null
  total: number = 0

  currencyData: any


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (this.isAtobDecodable(params.data)) {
        var data: number = +atob(params.data);
        this.getMainData(data);
      } else {
        this.router.navigate([''])
      }
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.getCurrencyAPI();
  }

  public getMainData(data: number) {
    this.accountService.getAccountById(2345673452).subscribe(
      (response) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
    this.tourDateService.getTourDateById(data).subscribe(
      (responseTourDate: TourDate) => {
        this.bookingService.getBookingsByTourDate(data).subscribe(
          (responseBooking: Booking[]) => {
            this.bookingList = responseBooking
            if (this.getDateDiffer(new Date(), responseTourDate.initiateDate) > 7 && responseTourDate.status.id == 2 && this.getBookedCustomerNumber() < responseTourDate.tour.availableSpaces) {
              this.tourDate = responseTourDate
              this.getImage(this.tourDate.tour.id)
              this.getHotelList()
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

    this.getDiscountList()
  }

  public getImage(tourId: number) {
    this.tourImageService.getTourImageByTourId(tourId).subscribe(
      (response: TourImage[]) => {
        this.tourImageList = response
      },
      (error) => {
        console.log(error.message)
      }
    )
  }

  public getHotelList() {
    this.hotelService.getAllHotel().subscribe(
      (response: Hotel[]) => {
        response = response.filter(hotel =>
          hotel.id != this.tourDate.tour.hotel.id
          && hotel.address.split(',')[hotel.address.split(',').length - 1].trim() == this.tourDate.tour.destinationAddress.split(',')[hotel.address.split(',').length - 1].trim()
          && hotel.address.split(',')[hotel.address.split(',').length - 2].trim() == this.tourDate.tour.destinationAddress.split(',')[hotel.address.split(',').length - 2].trim()
          && hotel.address.split(',')[hotel.address.split(',').length - 3].trim() == this.tourDate.tour.destinationAddress.split(',')[hotel.address.split(',').length - 3].trim()
        )
        this.hotelList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getDiscountList() {
    this.discountService.getAllDiscount().subscribe(
      (response: Discount[]) => {
        this.discountList = response
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getCurrencyAPI() {
    this.httpClient.get(`https://v6.exchangerate-api.com/v6/4f5333c28a72c8a9ae7a2658/latest/USD`).subscribe(
      (response) => {
        this.currencyData = response
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
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

  public getDateDiffer(date1: Date, date2: Date): number {
    var dateDif = Math.round(Number(new Date(date2).getTime()) - Number(new Date(date1).getTime())) / (24 * 60 * 60 * 1000)
    return dateDif
  }

  getBookedCustomerNumber(): number {
    return this.bookingList.reduce((sum, booking) => sum + booking.totalPassengers, 0)
  }

  changeData() {
    this.adult = +$('#adult').val().valueOf()
    this.children = +$('#children').val().valueOf()
    this.subTotal = this.adult * this.tourDate.tour.price.adultPrice + this.children * this.tourDate.tour.price.childrenPrice
    if (this.discount) {
      this.total = this.subTotal - (this.subTotal * this.discount.percentage / 100) + this.subTotal * 8 / 100
    } else {
      this.total = this.subTotal + this.subTotal * 8 / 100
    }
  }

  applyDiscount() {
    this.discount = this.discountList.find(discount => discount.code == $('#discount').val())
    if (this.discount) {
      this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm mã giảm giá thành công' })
    } else {
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Mã giảm giá không hợp lệ' })
    }
  }

  toPayment(num: number) {
    var booking: Booking = {
      id: null,
      createUser: this.currentUser,
      tourDate: this.tourDate,
      discount: this.discount,
      totalPrice: this.total,
      totalPassengers: this.adult + this.children,
      createTime: new Date(),
      updateTime: null,
      updateUser: null,
      status: null
    }

    var bookingDetail: BookingDetail = {
      id: null,
      adult: this.adult,
      children: this.children,
      bookingTime: new Date(),
      surcharge: this.subTotal * 8 / 100,
      booking: booking
    }
    if (num == 2) {
      booking.totalPrice = booking.totalPrice / this.currencyData.conversion_rates.VND
      this.httpClient.post('http://localhost:8080/pay', bookingDetail, { responseType: 'text' }).subscribe(
        (response: string) => {
          window.location.href = response
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    } else {
      this.httpClient.post('http://localhost:8080/submitOrder', bookingDetail, { responseType: 'text' }).subscribe(
        (response: string) => {
          window.location.href = response
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }

  }

}
