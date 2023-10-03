import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from 'src/app/models/account.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
      active: true,
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
      active: [true, Validators.required],
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

          console.log('Create success');
        },
        (error) => {
          // Xử lý lỗi ở đây
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
      active: true,
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
      active: true,
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
}
