import { TourPlanDetailService } from 'src/app/services/tour/tour-plan-detail.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Booking } from 'src/app/models/booking.model';
import { TourDate } from 'src/app/models/tour-date.model';
import { TourImage } from 'src/app/models/tour-img.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { Tour } from 'src/app/models/tour.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { CurdService } from 'src/app/services/curd.service';
import { TourDateService } from 'src/app/services/tour/tour-date.service';
import { TourImageService } from 'src/app/services/tour/tour-image.service';
import { TourService } from 'src/app/services/tour/tour.service';
import { forkJoin } from 'rxjs';
import { TourPlanDetail } from 'src/app/models/tour-plan-detail.model';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class DestinationDetailComponent implements OnInit {
  @ViewChild('planDetailModal') planDetailModal: ElementRef;
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private route: ActivatedRoute,
    private router: Router,
    private curdService: CurdService,
    private tourService: TourService,
    private tourDateService: TourDateService,
    private bookingService: BookingService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private tourImageService: TourImageService,
    private tourPlanDetailService: TourPlanDetailService
  ) { }
  responsiveOptions: any[] | undefined;
  currentTour: Tour;
  tourDateList: TourDate[];
  planList: TourPlan[];
  planDetailList: TourPlanDetail[] = []
  currentDate: Date = new Date();
  tourImageList: TourImage[];
  bookingData: { tourDateId: number; amount: number }[] = []

  ngOnInit(): void {
    this.loadScripts();
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getTour(id);
      this.getDateList(id);
      this.getTourPlans();
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
  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl(''),
  });

  public open(content) {
    this.httpClient
      .get(`${this.baseUrl}api/test/username`, { responseType: 'text' })
      .subscribe(
        (response) => {
          this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
          });
        },
        (error: HttpErrorResponse) => {
          this.router.navigateByUrl('/auth/login');
        }
      );
  }

  public getTour(id: number) {
    this.tourService.getTourById(id).subscribe(
      (response) => {
        this.currentTour = response;
        this.getImage(this.currentTour.id);
      },
      (error) => {
        this.router.navigateByUrl('/');
      }
    );
  }

  public getDateList(id: number) {
    const observables = [];
    this.tourDateService.getTourDateByTourId(id).subscribe(
      (response) => {
        this.tourDateList = response.filter(
          (t) =>
            t.status.id == 2 &&
            Math.round(
              Number(new Date(t.initiateDate).getTime()) -
              Number(new Date().getTime())
            ) /
            (24 * 60 * 60 * 1000) >
            3
        );
        for (let i = 0; i < this.tourDateList.length; i++) {
          const observable = this.bookingService.getNumberCustomerOfTourDateId(this.tourDateList[i].id);
          observables.push(observable);
        }
        forkJoin(observables).subscribe(
          (responses) => {
            for (let i = 0; i < this.tourDateList.length; i++) {
              this.bookingData.push({
                tourDateId: this.tourDateList[i].id,
                amount: responses[i]
              });
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  public getTourPlans(): void {
    this.curdService.getList('tour_plan').subscribe(
      (response: TourPlan[]) => {
        this.planList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getImage(tourId: number) {
    this.tourImageService.getTourImageByTourId(tourId).subscribe(
      (response: TourImage[]) => {
        this.tourImageList = response;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  public getPlanByDate(tourDateId: number) {
    return this.planList.filter((plan) => plan.tourDate.id === tourDateId);
  }

  public getPlanDetailByPlan(planId: number) {
    this.tourPlanDetailService.getTourPlanDetailsByTourPlanId(planId).subscribe(
      (response) => {
        this.planDetailList = response
        this.modalService.open(this.planDetailModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'xl',
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getBookedCustomerNumber(tourDateId: number) {
    return this.bookingData.find(data => data.tourDateId === tourDateId).amount
  }

  public toCheckOut(dateId: number) {
    this.modalService.dismissAll();
    this.router.navigate(['/checkout'], {
      queryParams: {
        data: btoa(JSON.stringify(dateId)),
      },
    });
  }

  public getDateDiffer(date1: Date, date2: Date): number {
    var dateDif: number =
      Math.round(
        Number(new Date(date2).getTime()) - Number(new Date(date1).getTime())
      ) /
      (24 * 60 * 60 * 1000);
    return dateDif;
  }
}
