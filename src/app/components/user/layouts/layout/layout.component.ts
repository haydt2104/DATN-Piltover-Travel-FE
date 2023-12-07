import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public accountName: string;
  public isLoggedIn: boolean;
  public role: string;
  constructor(
    public router: Router,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }
  ngOnInit() {
    this.loadScripts();
    this.loadHeader();
  }

  public loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.accountName = this.tokenStorageService.getUser().email;
      console.log('acc: ', this.tokenStorageService.getUser().email);
    }
    this.isLoggedIn = this.accountName != null;
  }

  loadScripts() {
    // Đường dẫn tới thư mục chứa các tệp JavaScript
    const scriptsPath = 'assets/js/';

    // Tên các tệp JavaScript muốn import
    const scriptFiles = [
      'jquery.min.js',
      'jquery-migrate-3.0.1.min.js',
      'popper.min.js',
      'bootstrap.min.js',
      'jquery.easing.1.3.js',
      'jquery.waypoints.min.js',
      'jquery.stellar.min.js',
      'owl.carousel.min.js',
      'jquery.magnific-popup.min.js',
      'jquery.animateNumber.min.js',
      'bootstrap-datepicker.js',
      'scrollax.min.js',
      'main.js',
    ];

    scriptFiles.forEach((scriptFile) => {
      const script = document.createElement('script');
      script.src = scriptsPath + scriptFile;
      script.type = 'text/javascript';
      script.async = false;
      document.body.appendChild(script);
    });
  }

  public openForm() {
    const form = document.getElementById('myForm') as HTMLElement;
    form.style.display = 'block';
  }

  public closeForm() {
    const form = document.getElementById('myForm') as HTMLElement;
    form.style.display = 'none';
  }

  public summitForm() {
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Thành công',
    //   detail: 'Bạn đã sửa comment thành công',
    // });
    alert('Tính năng này đang phát triển');
  }

  public logOut() {
    this.tokenStorageService.signOut();
    this.loadHeader();
    this.isLoggedIn = false;
  }
}
