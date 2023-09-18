import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TourPlanDetail } from 'src/app/services/tour.data';
import { TourPlanDetailService } from 'src/app/services/tour-plan-detail.service';

@Component({
  selector: 'app-tour-detail-plan',
  templateUrl: './tour-detail-plan.component.html',
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TourDetailPlanComponent implements OnInit {
  planDetailList: TourPlanDetail[];
  constructor(
    private route: ActivatedRoute,
    private tourPlanDetailService: TourPlanDetailService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id2'];
      this.getTourPlanByTourId(id);
    });
  }
  public getTourPlanByTourId(planId: number): void {
    this.tourPlanDetailService.getTourPlanDetailsByTourPlanId(planId).subscribe(
      (response: TourPlanDetail[]) => {
        this.planDetailList = response;
        console.log(this.planDetailList);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
