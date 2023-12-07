import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareService } from 'src/app/services/share.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLogin: Login;
  public formLoginDataReq: Login | any;
  public submitted: boolean;
  public loading = false;
  public username: string;
  public roles: [];
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private shareService: ShareService
  ) {
    this.userLogin = {} as Login;
  }
  ngOnInit(): void {
    this.formLoginDataReq = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [true],
    });
  }

  public login(): void {
    this.submitted = true;

    if (this.formLoginDataReq.valid) {
      console.log('Is login.....');
      this.loading = true;
      this.authService.login(this.formLoginDataReq.value).subscribe(
        (response) => {
          // Xử lý phản hồi từ API (lưu token vào cookie hoặc xử lý khác)
          console.log('Login successful', response);
          if (this.formLoginDataReq.value.remember_me) {
            this.tokenStorageService.saveTokenLocal(response.token);
            this.tokenStorageService.saveUserLocal(response);
          } else {
            this.tokenStorageService.saveTokenSession(response.token);
            this.tokenStorageService.saveUserSession(response);
          }

          this.authService.isLoggedIn = true;
          this.username = this.tokenStorageService.getUser().username;
          this.roles = this.tokenStorageService.getUser().roles;
          this.formLoginDataReq.reset();
          this.shareService.sendClickEvent();
          this.loading = false;
          setTimeout(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Đăng nhập thành công',
              text: 'Bạn sẽ được chuyển hướng đến trang chủ',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              // Thực hiện chuyển hướng sau khi hiển thị SweetAlert
              this.router.navigateByUrl('/');
            });
          }, 2000);
        },
        (error) => {
          // Xử lý lỗi từ API (hiển thị thông báo lỗi, đăng nhập không thành công, v.v.)
          console.error('Login failed', error);
          setTimeout(() => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Đăng nhập thất bại',
              text: 'Tên đăng nhập hoặc mật khẩu chưa chính xác',
              showConfirmButton: false,
              timer: 1500,
            });
          }, 2000);
          this.loading = false;
        }
      );
    } else {
      // Xử lý trường hợp thiếu thông tin đăng nhập
      console.error('Username and password are required');
    }
  }

  public onSubmit(): void {
    if (this.formLoginDataReq.valid) {
      console.log('Form Data: ', this.formLoginDataReq.value);
    } else {
      console.log('Invalid form');
    }
  }
}
