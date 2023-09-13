import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Tour, TourList } from './tour.data';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  standalone: true,
  imports: [NgFor, NgbPaginationModule, RouterModule],
})
export class TourComponent {
  tourList: Tour[];

  constructor() {
    this.tourList = TourList;
  }

  currentPage = 1;
}
