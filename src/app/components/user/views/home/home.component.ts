import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { HomeTour, SearchTour } from 'src/app/models/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public HomeTour: HomeTour[] = [];
  public currentPage = 1;
  public current = 1;
  public displayedTours: HomeTour[] = [];
  public toursPerPage = 6;
  constructor(private HomeService: HomeService) {}

  ngOnInit(): void {
    // console.log(this.HomeTour == null);
    this.loadScripts();
    if (this.HomeTour.length < 1) {
      this.getAll();
      this.autoChangeImage();
    }
  }

  loadScripts() {
    // Đường dẫn tới thư mục chứa các tệp JavaScript
    const scriptsPath = 'assets/js/';

    // Tên các tệp JavaScript muốn import
    const scriptFiles = [
      'jquery.min.js',
      'jquery-migrate-3.0.1.min.js',
      'popper.min.js',
      'bootstrap.min.js',
      'jquery.easing.1.3.js',
      'jquery.waypoints.min.js',
      'jquery.stellar.min.js',
      'owl.carousel.min.js',
      'jquery.magnific-popup.min.js',
      'jquery.animateNumber.min.js',
      'bootstrap-datepicker.js',
      'scrollax.min.js',
      'main.js',
    ];

    scriptFiles.forEach((scriptFile) => {
      const script = document.createElement('script');
      script.src = scriptsPath + scriptFile;
      script.type = 'text/javascript';
      script.async = false;
      document.body.appendChild(script);
    });
  }
  private getAll() {
    this.HomeService.getAllHomeTour().subscribe((response) => {
      this.HomeTour = response;
      this.displayedTours = this.getRandomTours(
        this.HomeTour,
        this.toursPerPage
      );
      // console.log('Các tour: ', this.HomeTour);
      // console.log('Tour ngau nhien: ', this.displayedTours);
    });
  }
  private getRandomTours(tours: HomeTour[], count: number): HomeTour[] {
    // Shuffle the array to randomize the tours
    let shuffledTours = tours.slice(); // Create a copy of the tours array
    for (let i = shuffledTours.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTours[i], shuffledTours[j]] = [
        shuffledTours[j],
        shuffledTours[i],
      ];
    }

    // Return a slice of the shuffled array to get the specified number of random tours
    return shuffledTours.slice(0, count);
  }
  formatCurrency(value: number): string {
    const formattedValue = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);

    return formattedValue.replace('₫', '') + 'VNĐ';
  }
  goToNextPage() {
    if (this.current < this.HomeTour.length) {
      this.current++;
    } else {
      this.current = 1;
    }
  }
  goToPreviousPage() {
    if (this.current > 1) {
      this.current--;
    } else {
      this.current = this.HomeTour.length;
    }
  }

  autoChangeImage() {
    setInterval(() => {
      this.goToNextPage();
    }, 3000);
  }
}
