import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = [
    'https://provinces.open-api.vn/api/',
    this.baseUrl + 'api/auth/login',
  ];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenStorageService.getToken();
    // Kiểm tra xem URL của request có nên loại bỏ token hay không
    if (this.shouldExcludeToken(request.url)) {
      return next.handle(request);
    }

    if (token) {
      // Thêm token vào header
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            error.status === 403 &&
            this.tokenStorageService.getToken()
          ) {
            // Trả về login nếu sảy ra lỗi xác thực token
            this.tokenStorageService.signOut();
            this.router.navigate(['/auth/login']);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private shouldExcludeToken(url: string): boolean {
    // Kiểm tra xem URL có trong danh sách URL cần loại bỏ token hay không
    return this.excludedUrls.some((excludedUrl) => url.startsWith(excludedUrl));
  }
}
