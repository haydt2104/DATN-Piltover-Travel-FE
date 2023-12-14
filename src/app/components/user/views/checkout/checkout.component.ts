import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { Account } from 'src/app/models/account.model';
import { BookingDetail } from 'src/app/models/booking-detail.model';
import { Booking } from 'src/app/models/booking.model';
import { Discount } from 'src/app/models/discount.model';
import { TourDate } from 'src/app/models/tour-date.model';
import { TourImage } from 'src/app/models/tour-img.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { TourDateService } from 'src/app/services/tour/tour-date.service';
import { TourImageService } from 'src/app/services/tour/tour-image.service';
import { AccountService } from './../../../../services/account/account.service';

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
  @ViewChild('confirmModal') confirmModal: ElementRef;
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private route: ActivatedRoute,
    private router: Router,
    private tourDateService: TourDateService,
    private bookingService: BookingService,
    private tourImageService: TourImageService,
    private hotelService: HotelService,
    private accountService: AccountService,
    private discountService: DiscountService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
  ) { }
  responsiveOptions: any[] | undefined;

  currentUser: Account;
  tourDate: TourDate;
  tourImageList: TourImage[];
  currentDate: Date = new Date();
  booking: Booking
  bookingDetail: BookingDetail

  adult: number = 0
  children: number = 0
  subTotal: number = 0
  discount: Discount = null
  total: number = 0
  bookedNumber = 0

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

    const adult = document.getElementById('adult');
    const children = document.getElementById('children');
    if (adult && children) {
      adult.addEventListener('input', () => this.changeData())
      children.addEventListener('input', () => this.changeData())
    }
  }

  public getMainData(data: number) {
    this.accountService.getCurrentAccount().subscribe(
      (response) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
    this.tourDateService.getTourDateById(data).subscribe(
      (responseTourDate: TourDate) => {
        this.tourDate = responseTourDate
        this.getImage(this.tourDate.tour.id)
        this.getBookedCustomerNumber()
      },
      (error: HttpErrorResponse) => {
        this.router.navigate([''])
      }
    )
    // setInterval(() => this.bookingService.getBookingsByTourDate(data).subscribe(
    //   (responseBooking: Booking[]) => {
    //     this.bookingList = responseBooking.filter(booking => booking.status != 2)
    //     this.updateAccessible();
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.router.navigate([''])
    //   }
    // ), 1000)
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

  isAtobDecodable(data: string): boolean {
    try {
      const decoded = atob(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  public getDateDiffer(date1: Date, date2: Date): number {
    var dateDif: number = Math.round(Number(new Date(date2).getTime()) - Number(new Date(date1).getTime())) / (24 * 60 * 60 * 1000)
    return dateDif
  }

  public getBookedCustomerNumber() {
    this.bookingService.getNumberCustomerOfTourDateId(this.tourDate.id).subscribe(
      (data) => {
        this.bookedNumber = data
        this.updateAccessible()
      })
  }

  changeData() {
    this.adult = +$('#adult').val().valueOf()
    if (this.adult < 0) {
      this.adult = 0;
    }
    this.children = +$('#children').val().valueOf()
    if (this.children < 0) {
      this.children = 0
    }
    this.subTotal = this.adult * this.tourDate.tour.price.adultPrice + this.children * this.tourDate.tour.price.childrenPrice
    if (this.discount) {
      if (this.subTotal < this.discount.min) {
        this.discount = null
      } else if ((this.subTotal * this.discount.percentage / 100) <= this.discount.max) {
        this.total = this.subTotal - (this.subTotal * this.discount.percentage / 100) + (this.subTotal * 8 / 100)
      } else {
        this.total = this.subTotal + (this.subTotal * 8 / 100) - this.discount.max
      }
    } else {
      this.total = this.subTotal + this.subTotal * 8 / 100
    }
    this.booking = {
      id: null,
      createUser: this.currentUser,
      tourDate: this.tourDate,
      discount: this.discount,
      totalPrice: this.total,
      totalPassengers: this.adult + this.children,
      createTime: null,
      updateTime: null,
      updateUser: this.currentUser,
      status: null
    }
    this.bookingDetail = {
      id: null,
      adult: this.adult,
      children: this.children,
      bookingTime: null,
      surcharge: this.subTotal * 8 / 100,
      booking: this.booking
    }
  }

  applyDiscount() {
    this.discountService.getDiscountByCode($('#discount').val().toString()).subscribe(
      (response) => {
        var dis = response
        if (dis && dis.isDelete == false && this.subTotal >= dis.min) {
          this.discount = dis
          this.changeData()
          this.messageService.clear()
          this.messageService.add({ key: 'success', severity: 'success', summary: 'Thông Báo', detail: 'Thêm mã giảm giá thành công' })
        } else if (dis && dis.isDelete == false && this.subTotal < dis.min) {
          this.messageService.clear()
          this.messageService.add({ key: 'info', severity: 'info', summary: 'Thông Báo', detail: 'Số tiền phải từ ' + dis.min.toLocaleString() + ' VNĐ để có thể sử dụng được mã giảm giá' })
        } else {
          this.messageService.clear()
          this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Mã giảm giá không hợp lệ' })
        }
      }
    )

  }

  openConfirm() {
    if (this.validate(1) == true) {
      this.modalService
        .open(this.confirmModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        })
      document.querySelector('#confirm').addEventListener('click', (e: Event) => this.toPayment(1));
    }
  }

  toPayment(num: number) {
    if (this.validate(num) == true) {
      if (num == 1) {
        this.discount = null;
        this.changeData();
        this.httpClient.post(`${this.baseUrl}nopay`, this.bookingDetail, { responseType: 'text' }).subscribe(
          (response: string) => {
            window.location.href = response
          },
          (error: HttpErrorResponse) => {
            console.log(error.message)
          }
        )
      } else if (num == 2) {
        this.httpClient.get(`https://v6.exchangerate-api.com/v6/4f5333c28a72c8a9ae7a2658/latest/USD`).subscribe(
          (response) => {
            var currencyData: any = response
            this.booking.totalPrice = this.booking.totalPrice / currencyData.conversion_rates.VND
            this.httpClient.post(`${this.baseUrl}paypal`, this.bookingDetail, { responseType: 'text' }).subscribe(
              (response: string) => {
                window.location.href = response
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
      } else if (num == 3) {
        this.httpClient.post(`${this.baseUrl}vnpay`, this.bookingDetail, { responseType: 'text' }).subscribe(
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

  updateAccessible() {
    if (this.getDateDiffer(this.currentDate, this.tourDate.initiateDate) < 3 || this.tourDate.status.id != 2 || this.bookedNumber >= this.tourDate.tour.availableSpaces) {
      window.location.href = "http://localhost:4200/"
    }
  }

  validate(num: number): boolean {
    if ((this.adult + this.children) > (this.tourDate.tour.availableSpaces - this.bookedNumber)) {
      this.messageService.clear()
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Số Lượng Chỗ Ngồi Không Đủ' })
      return false;
    } else if (this.adult == 0 && this.children == 0) {
      this.messageService.clear()
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Vui lòng nhập ít nhất 1 người' })
      return false;
    } else if (this.adult == 0 && this.children > 0) {
      this.messageService.clear()
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Vui lòng nhập ít nhất 1 người lớn khi có trẻ em' })
      return false;
    } else if ((this.adult + this.children) > 10 && num == 1) {
      this.messageService.clear()
      this.messageService.add({ key: 'warn', severity: 'warn', summary: 'Thông Báo', detail: 'Chức Năng Đặt Trước Chỉ Cho Phép Đặt Từ 10 Người Trở Xuống' })
      return false;
    } else {
      return true;
    }
  }
}
