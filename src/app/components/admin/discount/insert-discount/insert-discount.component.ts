import { Router } from '@angular/router';
import { Discount } from 'src/app/models/discount.model';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      name: new FormControl('', [Validators.required]),
      percentage: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      min: new FormControl('', [Validators.required]),
      max: new FormControl('', [Validators.required]),
    })
  }

  formGroup: FormGroup;
  Discount!: Discount;

  submitForm() {
    if (this.formGroup.invalid) {
      console.log('Error')
    } else {
      this.discountService.insertDiscount(this.formGroup.value).subscribe(data => {
        console.log(this.formGroup.value)
        console.log("Thêm thành công")
        this.router.navigateByUrl('/admin/manage/discount')

      }),(error) => {
        console.log(error);
      }
    }

  }
  validation_message = {
    name: [
      { type: 'required', message: 'không được bỏ trống tên mã' }
    ],
    percentage: [
      { type: 'required', message: 'không được bỏ trống phần trăm giảm' },
      // { type: 'min', message: 'Phần trăm giảm giá phải lớn hơn hoặc bằng 1' },
    ],
    amount: [
      { type: 'required', message: 'không được bỏ trống số lượng' },
      // { type: 'min', message: 'Số lượng phải lớn hơn hoặc bằng 1' },
    ],
    min: [
      { type: 'required', message: 'không được bỏ trống giá tối thiểu được dùng' },
      // { type: 'min-min', message: 'Mức giá tối dùng được phải lớn hơn hoặc bằng 0' },
    ],
    max: [
      { type: 'required', message: 'không được bỏ trống giá tối đa có thể giảm' },
      // { type: 'min', message: 'Số tiền giảm tối đa phải lớn hơn hoặc bằng 1' },
    ],
  }
}
