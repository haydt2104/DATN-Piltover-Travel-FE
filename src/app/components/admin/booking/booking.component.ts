import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
// ,AfterViewInit
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  loading: boolean = true;
  bookingStatus1: number;

  page:number=0;
  itemsPerPage: number = 5;
  p: number = 1;


  constructor(private bService: BookingService) {}

  ngOnInit() {
    this.getAllBooking();
    this.fetchBookingStatus();
  }


  getAllBooking() {
    this.loading = true;
    this.bService.ReadAllBooking().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
      },
      (error) => {
        Swal.fire({
          title: 'Lỗi',
          text: 'Không lấy được dữ liệu',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
      () => {
        this.loading = false;
      }
    );
  }

  fetchBookingStatus() {
    this.bookingStatus1 = 2;
  }

  cancelBooking(bid: number): void {
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
        this.bService.cancelBooking(bid).subscribe(
          () => {
            const index = this.bookings.findIndex((item) => item.id === bid);
            if (index !== -1) {
              this.bookings[index].status = 2;
            }
            Swal.fire({
              title: 'Hủy thành công!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          (error) => {
            console.error('Error cancel: ', error);
            Swal.fire({
              title: 'Lỗi',
              text: 'Hủy thất bại!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // "No" or closed the dialog
        Swal.fire('Đã hủy thao tác', 'Dữ liệu không bị thay đổi', 'info');
      }
    });
  }
}
