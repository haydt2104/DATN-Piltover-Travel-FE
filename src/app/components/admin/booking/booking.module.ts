import { EditBookingModule } from './edit-booking/edit-booking.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookingroutes } from './booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(Bookingroutes),
    EditBookingModule,
    HttpClientModule,

  ],
  declarations: [],
})
export class BookingModule {}
