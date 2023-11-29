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
  history!: History ;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private HistoryService: HistoryService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      const id = params['id'];
      const name="Dư Trường Hây";
      this.getdata(name,id);
    });
  }

  getdata(uname: String, id: number): void {
    this.HistoryService.getDetailHistory(uname, id).subscribe(
      (data: History) => {
        this.history = data;
        console.log('Data:', data);
      }
    ),
    (error) => {
        console.log('Loi', error);
    };
  }
}
