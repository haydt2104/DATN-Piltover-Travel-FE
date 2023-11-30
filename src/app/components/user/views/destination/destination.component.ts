import { Component } from '@angular/core';
import { HomeTour, SearchTour } from 'src/app/models/home.model';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent {
  public HomeTour!: HomeTour[];
  public pagedTourList: HomeTour[] = [];
  public currentPage = 1;
  searchError: string = '';
  dataLoaded: boolean = false;

  public newTour: SearchTour = {
    startDate: '0',
    tourName: '',
    startAddress: '',
    minPrice: 0,
    maxPrice: -1,
    priceRange: '', // Ensure 'priceRange' is of type 'string'
  };

  constructor(private HomeService: HomeService) {
  }

  ngOnInit(): void {
      this.createNewTour();
  }

  createNewTour() {
    this.HomeService.createTour(this.newTour).subscribe(response => {
      this.HomeTour = response;
      console.log('Các tour:', response);
      if (!response || response.length === 0) {
        // Không có kết quả từ tìm kiếm
        this.searchError = 'Không tìm thấy tour phù hợp.';
        this.dataLoaded = false;
      } else {
        // Có dữ liệu từ tìm kiếm
        this.HomeTour = response;
        this.dataLoaded = true;
      }
    }, error => {
      console.error('Error:', error);
    });
  }

  selectPriceRange(priceRange: string) {
    switch (priceRange) {
        case 'Dưới 3 triệu':
            this.newTour.minPrice = 0;
            this.newTour.maxPrice = 3000000;
            break;
        case 'Từ 3 - 7 triệu':
            this.newTour.minPrice = 3000000;
            this.newTour.maxPrice = 7000000;
            break;
        case 'Từ 7 - 10 triệu':
            this.newTour.minPrice = 7000000;
            this.newTour.maxPrice = 10000000;
            break;
        case 'Từ 10 đến 15':
              this.newTour.minPrice = 10000000;
              this.newTour.maxPrice = 15000000;
              break;
        case 'Trên 15':
              this.newTour.minPrice = 15000000;
              this.newTour.maxPrice = -1;
              break;
        default:
          this.newTour.minPrice = 0;
          this.newTour.maxPrice = -1;
          break;
    }
  }

  formatCurrency(value: number): string {
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);

  return formattedValue.replace('₫', '') + 'VNĐ';
}

onSortChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const sortOption = target.value;

  if (sortOption === 'lowest') {
    // Sắp xếp từ thấp đến cao theo giá
    this.HomeTour.sort((a, b) => a.adult_price - b.adult_price);
  } else if (sortOption === 'highest') {
    // Sắp xếp từ cao đến thấp theo giá
    this.HomeTour.sort((a, b) => b.adult_price - a.adult_price);
  } else if (sortOption === 'dateAsc') {
    // Sắp xếp theo ngày khởi hành từ thấp đến cao
    this.HomeTour.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  } else if (sortOption === 'dateDesc') {
    // Sắp xếp theo ngày khởi hành từ cao xuống thấp
    this.HomeTour.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
  }
}
}
