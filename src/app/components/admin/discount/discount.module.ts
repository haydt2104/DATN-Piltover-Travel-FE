import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditDiscountModule } from './edit-discount/edit-discount.module';
import { HttpClientModule } from '@angular/common/http';
import { DiscountRoutes } from './discount-routing.module';
import { InsertDiscountComponent } from './insert-discount/insert-discount.component';



@NgModule({
  declarations: [
    EditDiscountComponent,
    InsertDiscountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(DiscountRoutes),
    EditDiscountModule,
    HttpClientModule,
  ]
})
export class DiscountModule { }
