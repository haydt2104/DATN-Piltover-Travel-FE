import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from 'src/app/models/discount.model';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  constructor(
    private API_route: ActivatedRoute,
    private discount: DiscountService,
    private router: Router
  ) {}

  discounts!: Discount[];

  ngOnInit(): void {
    this.getDiscountList();
  }

  getDiscountList(): void {
    this.discount.ReadAllDiscountsFromAPI().subscribe((data: Discount[]) => {
      this.discounts = data;
      console.log('dataDiscount: ', this.discounts);
    }),
      (error) => {
        console.log(error);
      };
  }

  public deleteDiscount(id: number): void {
    console.log(id);
    this.discount.deleteDiscount(id).subscribe(() => {
      console.log('Discount deleted successfully');
      const index = this.discounts.findIndex(item => item.id === id);
      if (index !== -1) {
        this.discounts[index].isDelete = true;
      }


    },
    (error) => {
      console.error('Error deleting discount:', error);
    }
    );
  }
}
