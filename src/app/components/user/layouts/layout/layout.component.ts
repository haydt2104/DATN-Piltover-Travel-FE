
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']

})
export class LayoutComponent implements OnInit{
  constructor(public router: Router,
    private messageService: MessageService){}
  ngOnInit(){
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

  public openForm(){
    const form = document.getElementById("myForm") as HTMLElement;
    form.style.display = "block";
  }

  public closeForm(){
    const form = document.getElementById("myForm") as HTMLElement;
    form.style.display = "none";
  }

  public summitForm(){
    this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã sửa comment thành công' });
  }
}
