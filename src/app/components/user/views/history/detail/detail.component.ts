import { History } from './../../../../../models/history.model';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  history!: History;

  constructor(
    private API_route: ActivatedRoute,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private HistoryService: HistoryService
  ) {}

  ngOnInit(): void {

    this.getdata();
  }

  getdata() {
    const p_bookingid = this.API_route.snapshot.params['p_bookingid'];
    this.HistoryService.getDetailHistory(p_bookingid).subscribe((data) => {
      this.history = data;
      console.log('Data:', data);
      console.log('this.history:', this.history);
    }),
      (error) => {
        console.log('Loi', error);
      };
  }
}
