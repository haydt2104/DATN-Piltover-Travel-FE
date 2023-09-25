import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { BookingComponent } from "./booking.component";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Booking",
      urls: [{ title: "Booking", url: "/booking" }, { title: "Booking" }],
    },
    component: BookingComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  ],
})
export class BookingModule { }
