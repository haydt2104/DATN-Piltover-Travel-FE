import { Routes, RouterModule } from '@angular/router';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { Component } from '@angular/core';
import { BookingComponent } from './booking.component';

export const Bookingroutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BookingComponent},

      { path: 'detail/:bid', component: EditBookingComponent},
  ]
  }
];

