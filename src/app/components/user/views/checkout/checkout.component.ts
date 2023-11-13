import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  data: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(atob(params.data));
      console.log(this.data);
    })
  }

}
