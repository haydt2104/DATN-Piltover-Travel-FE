import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from '../entity/tour.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { TourService } from '../service/tour.service';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  standalone: true,
  imports: [NgFor, NgbPaginationModule, RouterModule],
})
export class TourComponent implements OnInit {
  public tourList: Tour[];
  currentPage = 1;
  constructor(private tourService: TourService) {
  }
  ngOnInit(): void {
    this.getTourList();
  }
  public getTourList(): void {
    this.tourService.getTourList().subscribe(
      (response: Tour[]) => {
        this.tourList = response;
        console.log(this.tourList);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
