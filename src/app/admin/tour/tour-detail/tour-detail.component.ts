import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getTourByID } from '../tour.data';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html'
})
export class TourDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(getTourByID(id ? parseInt(id) : 1));
  }
}
