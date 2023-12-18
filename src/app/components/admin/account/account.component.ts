import { error } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from 'src/app/models/account.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public accounts: Account[];
  public account: Account;
  public formAccountData: Account | any;
  public submitted: boolean;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.submitted = false;
    this.account = {
      gender: true,
      isDelete: false,
    } as Account;
    this.accounts = [{}] as Account[];

    this.formAccountData = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      fullname: ['', Validators.required],
      birthday: ['2001-01-01', Validators.required],
      gender: [true, Validators.required],
      address: ['', Validators.required],
      updateAt: [null],
      errorCount: [null],
      bannedTime: [null],
      isDelete: [false, Validators.required],
    });
  }

  public ngOnInit() {
    this.getAllAccount();
  }

  private getAllAccount(): void {
    this.accountService.getAllAccounts().subscribe(
      (data) => {
        // Xử lý dữ liệu thành công ở đây
        this.accounts = data;
        console.log('Account: ', this.accounts);
      },
      (error) => {
        // Xử lý lỗi ở đây
        console.error('Error: ', error);
      }
    );
  }

  public createAccount(): void {
    this.submitted = true;
    if (this.formAccountData.valid) {
      console.log('Form Data: ', this.formAccountData.value);

      this.accountService.createAccount(this.formAccountData.value).subscribe(
        (data) => {
          // Xử lý dữ liệu thành công ở đây
          this.accounts.push(data.newAccount);
          console.log('data', data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tạo tài khoản ADMIN thành công',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Create success');
        },
        (error) => {
          // Xử lý lỗi ở đây
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Tạo tài khoản thất bại',
            text: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Error: ', error);
          console.error('Error: ', error);
        }
      );
    }
  }

  public showAccountDetail(item: Account): void {
    console.log('Account Detail: ', item);

    this.formAccountData.patchValue(item);
  }

  public refreshForm(): void {
    this.account = {
      gender: true,
      isDelete: false,
    } as Account;

    this.formAccountData.patchValue({
      email: '',
      password: '',
      phone: '',
      fullname: '',
      birthday: '2001-01-01',
      gender: true,
      address: '',
      updateAt: null,
      errorCount: null,
      bannedTime: null,
      isDelete: false,
    });
    this.submitted = false;
  }

  public onSubmit(): void {
    if (this.formAccountData.valid) {
      console.log('Form Data: ', this.formAccountData.value);
    } else {
      console.log('Invalid form');
    }
  }

  public block(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Bạn có chắc chắn muốn khóa chứ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Khóa',
        cancelButtonText: 'Không',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.accountService.blockAccount(id).subscribe(
            (response) => {
              const index = this.accounts.findIndex(
                (account) => account.id === id
              );
              this.accounts[index].isDelete = true;
              swalWithBootstrapButtons.fire({
                title: 'Đã khóa!',
                text: response.message,
                icon: 'success',
              });
            },
            (error) => {
              // Xử lý lỗi ở đây
              swalWithBootstrapButtons.fire({
                title: 'Đã xảy ra lỗi!',
                text: error.error.message,
                icon: 'error',
              });
              console.error('Error: ', error);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Đã hủy',
            icon: 'error',
          });
        }
      });
  }
}
