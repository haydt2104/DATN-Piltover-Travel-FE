import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
}
