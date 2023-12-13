import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { Discount } from 'src/app/models/discount.model';
import { DiscountService } from 'src/app/services/discount/discount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  constructor(
    private API_route: ActivatedRoute,
    private discount: DiscountService,
    private router: Router
  ) {}

  page: number = 0;
  itemsPerPage: number = 5;
  p: number = 1;
  check: boolean;
  getID: number;

  discounts!: Discount[];

  ngOnInit(): void {
    this.getDiscountList();
  }

  getDiscountList(): void {
    this.discount.ReadAllDiscountsFromAPI1().subscribe((data: Discount[]) => {
      this.discounts = data;
    }),
      (error) => {};
  }

  public deleteDiscount(id: number): void {
    Swal.fire({
      title: 'Bạn chắc chắn muốn Khóa mã chứ !',
      text: 'Nếu chọn Khóa, mã giảm giá sẽ không dùng được nữa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Khóa',
      cancelButtonText: 'Hủy thao tác',
    }).then((result) => {
      if (result.value) {
        // "Yes"=>Clicked
        this.discount.deleteDiscount(id).subscribe(
          () => {
            const index = this.discounts.findIndex((item) => item.id === id);
            if (index !== -1) {
              this.discounts[index].isDelete = true;
            }
            Swal.fire({
              title: 'Khóa thành công!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi',
              text: 'Khóa thất bại!',
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

  public activeDiscount(id: number): void {
    Swal.fire({
      title: 'Bạn chắc chắn mở mã giảm giá chứ !',
      text: 'Nếu chọn mở, Khi mở người dùng sẽ dùng được',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Mở',
      cancelButtonText: 'Hủy thao tác',
    }).then((result) => {
      if (result.value) {
        this.discount.active(id).subscribe(
          () => {
            const index = this.discounts.findIndex((item) => item.id === id);
            if (index !== -1) {
              this.discounts[index].isDelete = false;
            }
            Swal.fire({
              title: 'Mở thành công!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi',
              text: 'Mở thất bại!',
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
}
