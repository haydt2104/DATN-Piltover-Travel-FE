import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public accounts!: Account[];
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAllAccount(); // Gọi hàm getAccounts() trong ngOnInit()
  }

  private getAllAccount() {
    this.accountService.getAllAccounts().subscribe((data) => {
      this.accounts = data;
      console.log('Account: ', this.accounts);
    });
  }
}
