import Swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
import { Discount } from 'src/app/models/discount.model';
import { Hotel } from 'src/app/models/hotel.model';
import { BookingdetailService } from 'src/app/services/bookingdetail/bookingdetail.service';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit {
  constructor(
    private API_route: ActivatedRoute,
    private bookingDetail: BookingdetailService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  hotels!: Hotel[];
  discounts!: Discount[];
  detailItem: BookingDetail;
  FormGroup: FormGroup;

  DiscountName: String = '';
  Money: number = 0;
  bid: number;
  bookingStatus1: number;
  loading: boolean = true;

  ngOnInit(): void {
    this.getDetailBooking(this.API_route.snapshot.params['bid']);
    this.fetchBookingStatus();
  }

  getDetailBooking(bid: number): void {
    this.loading = true;
    this.bookingDetail.getDetailDataBookingByIdFromAPI(bid).subscribe(
      (data) => {
        this.detailItem = data;
        const maxDiscount = this.detailItem.booking.discount?.max ?? 0;
        this.Money = this.detailItem.booking.totalPrice - maxDiscount;
        this.DiscountName = this.detailItem.booking.discount
          ? this.detailItem.booking.discount.name
          : 'Không có';
        // console.log('dataDetailBooking:', this.detailItem);
        this.loading = false;
      },
      (error) => {
        // console.error('Error fetching data', error);
        this.loading = false;
      }
    );
  }

  fetchBookingStatus() {
    this.bookingStatus1 = 2;
  }

  cancelBooking() {
    this.bid = this.API_route.snapshot.params['bid'];
    Swal.fire({
      title: 'Bạn chắc chắn muốn hủy booking chứ !',
      text: 'Nếu chọn tiếp tục, booking của người dùng sẽ hủy',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Tiếp tục',
      cancelButtonText: 'Hủy thao tác',
    }).then((result) => {
      if (result.value) {
        // "Yes"=>Clicked
        if (this.bid) {
          this.bookingService.cancelBooking(this.bid).subscribe(
            () => {
              console.log('Booking canceled successfully');
              Swal.fire({
                title: 'Hủy thành công!',
                text: 'Quay lại danh sách booking trong ',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false,
              }).then(() => {
                this.router.navigateByUrl('/admin/manage/booking');
              });
            },
            (error) => {
              // console.error('Error cancel: ', error);
              Swal.fire({
                title: 'Lỗi',
                text: 'Hủy thất bại!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // "No" or closed the dialog
        Swal.fire('Đã hủy thao tác', 'Dữ liệu không bị thay đổi', 'info');
      }
    });
  }
}
