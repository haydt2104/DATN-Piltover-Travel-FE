import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Booking } from 'src/app/models/booking.model';
import { TourDate } from 'src/app/models/tour-date.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { Tour } from 'src/app/models/tour.model';
import { BookingService } from 'src/app/services/booking/booking.service';
import { CurdService } from 'src/app/services/curd.service';
import { TourDateService } from 'src/app/services/tour/tour-date.service';
import { TourService } from 'src/app/services/tour/tour.service';


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
    InputTextModule
  ]
})
export class DestinationDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private curdService: CurdService,
    private tourService: TourService,
    private tourDateService: TourDateService,
    private bookingService: BookingService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { }

  currentTour: Tour
  tourDateList: TourDate[]
  bookingList: Booking[]
  planList: TourPlan[]
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getTour(id);
      this.getDateList(id);
      this.getTourPlans();
      this.getBookingList();
    });
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  public open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'xl',
    })
  }

  public getTour(id: number) {
    this.tourService.getTourById(id).subscribe(
      (response) => {
        this.currentTour = response
        if (this.currentTour.active == false) {
          window.location.href = "http://localhost:4200/"
        }
      },
      (error) => {
        console.log(error.message)
      }
    )
  }

  public getDateList(id: number) {
    this.tourDateService.getTourDateByTourId(id).subscribe(
      (response) => {
        this.tourDateList = response.filter(t => t.status.id == 2 && Math.round(Number(new Date(t.initiateDate).getTime()) - Number(new Date().getTime())) / (24 * 60 * 60 * 1000) > 3)
      },
      (error) => {
        console.log(error.message)
      }
    )
  }

  public getBookingList() {
    this.bookingService.getAllBooking().subscribe(
      (response) => {
        this.bookingList = response
      },
      (error) => {
        console.log(error.message)
      }
    )
  }

  public getTourPlans(): void {
    this.curdService.getList("tour_plan").subscribe(
      (response: TourPlan[]) => {
        this.planList = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getPlanByDate(tourDateId: number) {
    return this.planList.filter(plan => plan.tourDate.id === tourDateId);
  }

  public getBookedCustomerNumber(tourDateId: number): number {
    return this.bookingList.filter(booking => booking.tourDate.id === tourDateId && booking.status != 2).reduce((sum, booking) => sum + booking.totalPassengers, 0)
  }

  public toCheckOut(dateId: number) {
    this.modalService.dismissAll()
    this.router.navigate(['/checkout'], {
      queryParams: {
        data: btoa(JSON.stringify(dateId))
      }
    })
  }

  public getDateDiffer(date1: Date, date2: Date): number {
    var dateDif: number = Math.round(Number(new Date(date2).getTime()) - Number(new Date(date1).getTime())) / (24 * 60 * 60 * 1000)
    return dateDif
  }
}
