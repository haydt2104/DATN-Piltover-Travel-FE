import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { ChangeInfo } from 'src/app/models/change-info.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.scss'],
})
export class ChangeinfoComponent implements OnInit {
  public formChangeDataReq: any;
  public submitted: boolean;
  public oldInfo: Account;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getOldInfo(this.tokenStorage.getUser().email);
    console.log('email ', this.tokenStorage.getUser().email);

    this.submitted = false;
    this.formChangeDataReq = this.formBuilder.group({
      id: [''],
      phone: ['', Validators.required],
      fullname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: [true, Validators.required],
      address: ['', Validators.required],
    });
  }

  getOldInfo(email: string) {
    this.authService.getInfoByEmail(email).subscribe(
      (response) => {
        console.log(response);

        this.oldInfo = response.account;
        this.formChangeDataReq.patchValue({
          id: this.oldInfo.id,
          phone: this.oldInfo.phone,
          fullname: this.oldInfo.fullname,
          birthday: this.oldInfo.birthday,
          gender: this.oldInfo.gender,
          address: this.oldInfo.address,
        });
      },
      (error) => {
        // Xử lý lỗi ở đây
        console.error('Error: ', error);
      }
    );
  }

  onSubmit() {
    if (this.formChangeDataReq.valid) {
      console.log('Form Data: ', this.formChangeDataReq.value);
    } else {
      console.log('Invalid form');
    }
  }
  changeInfo() {
    this.submitted = true;
    if (this.formChangeDataReq.valid) {
      console.log('Form Data: ', this.formChangeDataReq.value);

      this.authService.changeInfo(this.formChangeDataReq.value).subscribe(
        (data) => {
          // Xử lý dữ liệu thành công ở đây
          console.log('data', data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thay đổi thông tin thành công',
            text: 'Bạn sẽ được chuyển hướng đến trang chủ',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Thực hiện chuyển hướng sau khi hiển thị SweetAlert
            this.router.navigateByUrl('/home');
          });
          console.log('Create success');
        },
        (error) => {
          // Xử lý lỗi ở đây
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Thay đổi thông tin thất bại',
            text: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Error: ', error);
        }
      );
    }
  }
}
