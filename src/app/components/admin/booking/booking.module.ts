import { EditBookingModule } from './edit-booking/edit-booking.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookingroutes } from './booking-routing.module';
import { EditBookingComponent } from './edit-booking/edit-booking.component';//detail
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { BookingComponent } from './booking.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(Bookingroutes),
    EditBookingModule
  ],
  declarations: [],
})
export class BookingModule {}
