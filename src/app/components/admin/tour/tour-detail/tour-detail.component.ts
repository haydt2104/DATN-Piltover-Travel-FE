import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { TourPlanService } from 'src/app/services/tour-plan.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TourDetailComponent implements OnInit {
  planList: TourPlan[];
  constructor(
    private route: ActivatedRoute,
    private tourPlanService: TourPlanService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getTourPlanByTourId(id);
    });
  }

  public getTourPlanByTourId(tourId: number): void {
    this.tourPlanService.getTourPlansByPlanID(tourId).subscribe(
      (response: TourPlan[]) => {
        this.planList = response;
        console.log(this.planList);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
