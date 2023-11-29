import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckoutRoutes } from './checkout.routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CheckoutRoutes),
    FormsModule,
    NgIf,
  ],
})
export class CheckoutModule { }
