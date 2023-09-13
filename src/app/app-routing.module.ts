import { TourModule } from './admin/tour/tour.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './admin/layouts/full/full.component';
import { TourComponent } from './admin/tour/tour.component';

export const Approutes: Routes = [
  {
    path: 'admin',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'tour',
        loadChildren: () => import('./admin/tour/tour.module').then(m => m.TourModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./admin/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./admin/component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
