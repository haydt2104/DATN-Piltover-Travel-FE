import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from '../../../models/tour.entity';
import { CurdService } from './../../../services/curd.service';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  standalone: true,
  imports: [NgFor, NgbPaginationModule, RouterModule],
})
export class TourComponent implements OnInit {
  public tourList: Tour[];
  currentPage = 1;
  constructor(private curdService: CurdService) {}
  ngOnInit(): void {
    this.getTourList();
  }
  public getTourList(): void {
    this.curdService.getList("tour").subscribe(
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
