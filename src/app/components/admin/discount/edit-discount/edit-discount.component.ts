import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss'],
})
export class EditDiscountComponent implements OnInit {
  constructor(private API_route: ActivatedRoute,) {}

  public ngOnInit(): void {
    alert(this.API_route.snapshot.params['id']);
  }
}
