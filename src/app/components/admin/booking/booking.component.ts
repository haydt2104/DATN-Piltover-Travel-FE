import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})

export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  loading: boolean = true;
  bookingStatus1: number;

  page: number = 0;
  itemsPerPage: number = 5;
  p: number = 1;

  activityValues: number[] = [0, 100];

  constructor(private bService: BookingService) {}

  ngOnInit() {
    this.getAllBooking();
    this.fetchBookingStatus();
  }

  getAllBooking() {
    this.loading = true;
    this.bService.getAllBooking().subscribe(
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

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      // let value1 = this.getPropertyValue(data1,event.field);
      // let value2 = this.getPropertyValue(data2,event.field);
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
