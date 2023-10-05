import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-hotel',
  templateUrl: './top-hotel.component.html',
  styleUrls: ['./top-hotel.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class TopHotelComponent {

}
