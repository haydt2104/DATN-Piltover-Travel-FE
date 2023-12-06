import { Router } from '@angular/router';
import { Discount } from 'src/app/models/discount.model';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DiscountService } from 'src/app/services/discount/discount.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-discount',
  templateUrl: './insert-discount.component.html',
  styleUrls: ['./insert-discount.component.scss'],
})
export class InsertDiscountComponent implements OnInit {
  constructor(
    private discountService: DiscountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      percentage: ['', [Validators.required,Validators.min(0), Validators.max(100)]],
      amount: ['', [Validators.required,  Validators.min(0)]],
      min: ['', [Validators.required, Validators.min(0)]],
      max: ['', [Validators.required, Validators.min(0)]],
    });
  }

  formGroup: FormGroup;
  Discount!: Discount;

  submitForm() {
    if (this.formGroup.invalid) {
    } else {
      Swal.fire({
        title: 'Bạn chắc chắn muốn thêm mã giảm giá chứ!',
        text: 'Nếu chọn thêm, mã giảm giá của tour sẽ được thêm vào',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Thêm',
        cancelButtonText: 'Hủy thao tác',
      }).then((result) => {
        if (result.value) {
          this.discountService
            .insertDiscount(this.formGroup.value)
            .subscribe((data) => {
              Swal.fire({
                title: 'Thêm thành công!',
                text: 'Quay lại danh sách mã giảm giá sau 3 giây',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                showCancelButton: false,
                showConfirmButton: false,
              }).then(() => {
                this.router.navigateByUrl('/admin/manage/discount');
              });
            }),
            (error) => {
              Swal.fire({
                title: 'Lỗi',
                text: 'Cập nhật thất bại!',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            };
        }else if (result.dismiss === Swal.DismissReason.cancel) {
          // "No" or closed the dialog
          Swal.fire('Đã hủy thao tác', 'Dữ liệu không thay đổi', 'info');
        }
      });
    }
  }
}
