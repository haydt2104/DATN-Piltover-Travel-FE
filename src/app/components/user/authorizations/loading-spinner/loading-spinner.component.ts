import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingSpinnerComponent {
  constructor(public loader: LoaderService) {}
}
