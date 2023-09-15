import { TourPlan } from './../../service/tour.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tour-detail-plan',
  templateUrl: './tour-detail-plan.component.html',
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TourDetailPlanComponent implements OnInit {
  tourPlan: TourPlan;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id2'];
      console.log(id);
    });
  }
}
