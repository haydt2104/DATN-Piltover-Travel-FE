import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TourDate } from 'src/app/models/tour-date.model';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { Tour } from 'src/app/models/tour.model';
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
    ButtonModule
  ]
})
export class DestinationDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private tourDateService: TourDateService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private curdService: CurdService
  ) { }

  currentTour: Tour
  tourDateList: TourDate[]
  planList: TourPlan[]

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getTour(id);
      this.getDateList(id);
      this.getTourPlans();
    });
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', size: 'xl',
    })
  }

  getTour(id: number) {
    this.tourService.getTourById(id).subscribe(
      (response) => {
        this.currentTour = response
      },
      (error) => {
        console.log(error.message)
      }
    )
  }

  getDateList(id: number) {
    this.tourDateService.getTourDateByTourId(id).subscribe(
      (response) => {
        this.tourDateList = response.filter(t => t.status.id == 2 && Math.round(Number(new Date(t.initiateDate).getTime()) - Number(new Date().getTime())) / (24 * 60 * 60 * 1000) > 7)
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

  public getPlanByDate(id: number) {
    return this.planList.filter(plan => plan.tourDate.id === id);
  }
}
