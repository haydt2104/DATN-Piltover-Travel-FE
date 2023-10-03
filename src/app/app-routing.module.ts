import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './components/admin/layouts/full/full.component';
import { LayoutComponent } from './components/user/layouts/layout/layout.component';
import { HomeComponent } from './components/user/views/home/home.component';
import { PageNotFoundComponent } from './components/user/views/page-not-found/page-not-found.component';
import { AboutComponent } from './components/user/views/about/about.component';
import { ContactComponent } from './components/user/views/contact/contact.component';
import { HistoryComponent } from './components/user/views/history/history.component';
import { HistoryDetailComponent } from './components/user/views/history-detail/history-detail.component';
import { BlogComponent } from './components/user/views/blog/blog.component';
import { BlogSingleComponent } from './components/user/views/blog-single/blog-single.component';
import { DestinationComponent } from './components/user/views/destination/destination.component';
import { DestinationDetailComponent } from './components/user/views/destination-detail/destination-detail.component';
import { ForgotpassComponent } from './components/user/authorizations/forgotpass/forgotpass.component';
import { SignUpComponent } from './components/user/authorizations/sign-up/sign-up.component';
import { LoginComponent } from './components/user/authorizations/login/login.component';
import { AuthorizationsComponent } from './components/user/authorizations/authorizations.component';

export const Approutes: Routes = [
  {
    path: 'admin',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'tour',
        loadChildren: () =>
          import('./components/admin/tour/tour.module').then(
            (m) => m.TourModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./components/admin/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'manage/account',
        loadChildren: () =>
          import('./components/admin/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'manage/booking',
        loadChildren: () =>
          import('./components/admin/booking/booking.module').then(
            (m) => m.BookingModule
          ),
      },
      {
        path: 'manage/bookingdetail',
        loadChildren: () =>
          import('./components/admin/bookingdetail/bookingdetail.module').then(
            (m) => m.BookingdetailModule
          ),
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./components/admin/component/component.module').then(
            (m) => m.ComponentsModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'history-detail', component: HistoryDetailComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog-single', component: BlogSingleComponent },
      { path: 'destination', component: DestinationComponent },
      { path: 'destination-detail', component: DestinationDetailComponent },
    ],
  },
  {
    path: 'authorization',
    component: AuthorizationsComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-pass', component: ForgotpassComponent },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
