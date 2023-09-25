import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { BookingdetailComponent } from "./bookingdetail.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "BookingDetail",
      urls: [{ title: "Bookingdetail", url: "/BookingDetail" }, { title: "BookingDetail" }],
    },
    component: BookingdetailComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BookingdetailModule { }
