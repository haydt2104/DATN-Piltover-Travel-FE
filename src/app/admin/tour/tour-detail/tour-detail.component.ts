import { NgFor } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tour, getTourByID } from '../tour.data';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TourDetailComponent implements OnInit {
  tour: Tour;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.tour = getTourByID(id);
      console.log(this.tour);
    });
  }
}
