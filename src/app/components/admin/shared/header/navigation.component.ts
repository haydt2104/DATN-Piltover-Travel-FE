import { Router } from '@angular/router';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from 'src/app/services/share.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements AfterViewInit {
  public accountName: string;
  public isLoggedIn: boolean;
  public role: string;
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private router: Router,
    private authService: AuthService
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  public loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.accountName = this.tokenStorageService.getUser().email;
      console.log('acc: ', this.tokenStorageService.getUser().email);
    }
    this.isLoggedIn = this.accountName != null;
  }

  public logOut() {
    this.authService.logout().subscribe(
      (response) => {
        // Xử lý response sau khi logout thành công
        console.log('Logout successful:', response);

        // Gọi các hàm cần thiết sau khi logout
        this.tokenStorageService.signOut();
        this.loadHeader();
        this.isLoggedIn = false;
        this.router.navigateByUrl('/auth/login');
      },
      (error) => {
        // Xử lý lỗi nếu có
        console.error('Logout failed:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.loadHeader();
  }
}
