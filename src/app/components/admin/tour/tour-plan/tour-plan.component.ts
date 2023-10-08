import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TourPlan } from 'src/app/models/tour-plan.model';
import { TourPlanService } from 'src/app/services/tour-plan.service';

@Component({
  selector: 'app-tour-plan',
  templateUrl: './tour-plan.component.html',
  standalone: true,
  imports: [NgFor, RouterLink, TableModule, ReactiveFormsModule],
})
export class TourPlanComponent implements OnInit {
  planList: TourPlan[];
  constructor(
    private route: ActivatedRoute,
    private tourPlanService: TourPlanService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.getTourPlanByTourId(id);
    });
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

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
