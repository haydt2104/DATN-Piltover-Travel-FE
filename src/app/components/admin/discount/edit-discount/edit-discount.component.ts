import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { Discount } from 'src/app/models/discount.model';
import { DiscountService } from 'src/app/services/discount/discount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss'],
})
export class EditDiscountComponent implements OnInit {
  constructor(
    private API_route: ActivatedRoute,
    private discountService: DiscountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  formGroup: FormGroup;
  Discount!: Discount;

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      percentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      amount: ['', [Validators.required, Validators.min(0)]],
      min: ['', [Validators.required, Validators.min(0)]],
      max: ['', [Validators.required, Validators.min(0)]],
    });
    this.getDataDiscount(this.API_route.snapshot.params['did']);
  }

  getDataDiscount(id: number): void {
    this.discountService.readOneDisountsFromAPI1(id).subscribe((data) => {
      this.Discount = data;

      this.formGroup.patchValue({
        name: this.Discount.name,
        percentage: this.Discount.percentage,
        amount: this.Discount.amount,
        min: this.Discount.min,
        max: this.Discount.max,
      });
      // console.log('Form Group data:', this.formGroup.value);
    }),
      (error) => {
        Swal.fire({
          title: 'Lỗi',
          text: 'Không lấy được dữ liệu',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigateByUrl('/admin/manage/discount');
        });
      };
  }

  submitForm() {
    const id = this.API_route.snapshot.params['did'];
    const request = this.formGroup.value;
    Swal.fire({
      title: 'Bạn chắc chắn muốn cập nhật lại mã giảm giá chứ!',
      text: 'Nếu chọn cập nhật, mã giảm giá sẽ sửa lại!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      cancelButtonText: 'Hủy thao tác',
    }).then((result) => {
      if (result.value) {
        this.discountService.updateDiscount(id, request).subscribe(
          (response) => {
            Swal.fire({
              title: 'Cập nhật thành công!',
              text: 'Quay lại danh sách mã giảm giá sau 3 giây',
              icon: 'success',
              timer: 3000,
              timerProgressBar: true,
              showCancelButton: false,
              showConfirmButton: false,
            }).then(() => {
              this.router.navigateByUrl('/admin/manage/discount');
            });
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi',
              text: 'Cập nhật thất bại!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        // "No" or closed the dialog
        Swal.fire('Đã hủy thao tác', 'Dữ liệu không bị thay đổi', 'info');
      }
    });
  }
}
