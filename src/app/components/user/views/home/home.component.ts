import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { HomeTour } from 'src/app/models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  public HomeTour!: HomeTour[];

  constructor(private HomeService: HomeService) {
  }

  ngOnInit(): void {
      this.getAll();
  }

  private getAll(){
    this.HomeService.getAllHomeTour().subscribe((data) =>{
      this.HomeTour = data;
    console.log('Các tour: ', this.HomeTour);
    });
}
formatCurrency(value: number): string {
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);

  return formattedValue.replace('₫', '') + 'VNĐ';
}
}
