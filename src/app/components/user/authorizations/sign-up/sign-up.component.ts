import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/components/user/authorizations/validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public formSignUpDataReq: any;
  public submitted: boolean;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.submitted = false;
    this.formSignUpDataReq = this.formBuilder.group(
      {
        email: ['', Validators.required],
        phone: ['', Validators.required],
        fullname: ['', Validators.required],
        birthday: ['2001-01-01', Validators.required],
        gender: [true, Validators.required],
        address: ['', Validators.required],
        password: ['', Validators.required],
        confirmPass: ['', Validators.required],
      },
      {
        validator: CustomValidators.matchPasswordValidator(
          'password',
          'confirmPass'
        ),
      }
    );
  }

  public signUp() {
    this.submitted = true;
    if (this.formSignUpDataReq.valid) {
      console.log('Form Data: ', this.formSignUpDataReq.value);

      this.authService.signUp(this.formSignUpDataReq.value).subscribe(
        (data) => {
          // Xử lý dữ liệu thành công ở đây
          console.log('data', data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng ký thành công',
            text: 'Bạn sẽ được chuyển hướng đến trang đăng nhập',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Thực hiện chuyển hướng sau khi hiển thị SweetAlert
            this.router.navigateByUrl('/auth/login');
          });
          console.log('Create success');
        },
        (error) => {
          // Xử lý lỗi ở đây
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Đăng ký thất bại',
            text: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Error: ', error);
        }
      );
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.formSignUpDataReq.valid) {
      console.log('Form Data: ', this.formSignUpDataReq.value);
    } else {
      console.log('Invalid form');
    }
  }
}
