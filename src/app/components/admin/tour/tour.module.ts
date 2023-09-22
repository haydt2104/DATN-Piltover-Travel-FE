import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TourRoutes } from './tour.routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TourRoutes),
    FormsModule,
    NgIf
  ],
})
export class TourModule {}
