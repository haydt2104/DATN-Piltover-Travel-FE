import { Injectable } from '@angular/core';
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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    // Kiểm tra xem URL của request có nên loại bỏ token hay không
    if (this.shouldExcludeToken(request.url)) {
      return next.handle(request);
    }

    if (token) {
      // Clone the request and add the token to the Authorization header
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            // Redirect to the login page on 403 error
            this.router.navigate(['/auth/login']);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private shouldExcludeToken(url: string): boolean {
    // Kiểm tra xem URL có trùng khớp với URL mà bạn muốn loại bỏ token hay không
    return url.startsWith('https://provinces.open-api.vn/api/');
  }
}
