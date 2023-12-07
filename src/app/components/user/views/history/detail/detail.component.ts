import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDetail } from 'src/app/models/bookingdetail.model';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  history!: BookingDetail ;
  loading:boolean=true;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private HistoryService: HistoryService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      const id = params['id'];
      this.getdata(id);
    });
  }

  getdata(id: number): void {
    this.HistoryService.getDetailHistory(id).subscribe(
      (data: BookingDetail) => {
        this.history = data;
        this.loading=false;
      }
    ),
    (error) => {
      this.loading=true;
    };
  }

}
