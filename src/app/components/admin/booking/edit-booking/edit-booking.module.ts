import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { EditBookingComponent } from './edit-booking.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  declarations: [
    EditBookingComponent
  ],
})
export class EditBookingModule { }
