import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.userLogin = {} as Login;
  }
  ngOnInit(): void {
    this.formLoginDataReq = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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
          sessionStorage.setItem('token', response.token);

          this.loading = false;
        },
        (error) => {
          // Xử lý lỗi từ API (hiển thị thông báo lỗi, đăng nhập không thành công, v.v.)
          console.error('Login failed', error);
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
