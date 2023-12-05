import { Routes,RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';
import { DetailComponent } from './detail/detail.component';
import { Component } from '@angular/core';


export const HistoryRounter: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HistoryComponent},
      { path: 'detail/:p_bookingid', component: DetailComponent},
    ]
  }
];
