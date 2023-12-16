import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  history!: BookingDetail;
  loading: boolean = true;

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private HistoryService: HistoryService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadScripts();
    this.ActivatedRoute.queryParams.subscribe((params) => {
      const id = params['id'];
      this.getdata(id);
    });
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

  getdata(id: number): void {
    this.HistoryService.getDetailHistory(id).subscribe(
      (data: BookingDetail) => {
        this.history = data;
        this.loading = false;
      }
    ),
      (error) => {
        this.loading = true;
      };
  }

  toPayment(num: number) {
    if (num == 1) {
      this.httpClient.get(`https://v6.exchangerate-api.com/v6/4f5333c28a72c8a9ae7a2658/latest/USD`).subscribe(
        (response) => {
          var currencyData: any = response
          this.history.booking.totalPrice = this.history.booking.totalPrice / currencyData.conversion_rates.VND
          this.httpClient.post(`${this.baseUrl}paypal`, this.history, { responseType: 'text' }).subscribe(
            (response: string) => {
              window.location.href = response
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          )
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    } else if (num == 2) {
      this.httpClient.post(`${this.baseUrl}vnpay`, this.history, { responseType: 'text' }).subscribe(
        (response: string) => {
          window.location.href = response
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }
  }
}
