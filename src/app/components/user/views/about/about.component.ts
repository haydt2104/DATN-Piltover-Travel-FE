import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../authorizations/loader.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    this.loadScripts();
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
}
