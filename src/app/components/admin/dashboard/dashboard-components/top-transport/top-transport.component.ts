import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-transport',
  templateUrl: './top-transport.component.html',
  styleUrls: ['./top-transport.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TopTransportComponent {

}
