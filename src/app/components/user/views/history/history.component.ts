import { BookingService } from 'src/app/services/booking/booking.service';
import { History } from './../../../../models/history.model';
import { Booking } from 'src/app/models/booking.model';
import { HistoryService } from './../../../../services/history/history.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  Historys: History[] = [];
  List: Booking[] = [];
  bookingStatus1:number;

  constructor(
    private HistoryService: HistoryService,
    private BookingService: BookingService
  ) {}

  page: number = 0;
  itemsPerPage: number = 5;
  p: number = 1;

  ngOnInit(): void {
    this.getLisHistory();
    this.fetchBookingStatus();
  }

  public getLisHistory(): void {
    this.HistoryService.getHistoryByAccAPI().subscribe((data: Booking[]) => {
      this.List = data;
    }),
      (error) => {};
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
        this.HistoryService.cancelBooking(bid).subscribe(
          () => {
            const index = this.List.findIndex((item) => item.id === bid);
            if (index !== -1) {
              this.List[index].status = 2;
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
