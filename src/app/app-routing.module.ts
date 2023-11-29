import { Comment } from './models/comment.model';
import { PostModule } from './components/admin/post/post.module';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './components/admin/layouts/full/full.component';
import { LayoutComponent } from './components/user/layouts/layout/layout.component';
import { HomeComponent } from './components/user/views/home/home.component';
import { PageNotFoundComponent } from './components/user/views/page-not-found/page-not-found.component';
import { AboutComponent } from './components/user/views/about/about.component';
import { ContactComponent } from './components/user/views/contact/contact.component';
import { HistoryComponent } from './components/user/views/history/history.component';
import { DestinationComponent } from './components/user/views/destination/destination.component';
import { DestinationDetailComponent } from './components/user/views/destination-detail/destination-detail.component';
import { ForgotpassComponent } from './components/user/authorizations/forgotpass/forgotpass.component';
import { SignUpComponent } from './components/user/authorizations/sign-up/sign-up.component';
import { LoginComponent } from './components/user/authorizations/login/login.component';
import { AuthorizationsComponent } from './components/user/authorizations/authorizations.component';
import { PostComponent } from './components/user/views/post/post.component';
import { PostSingleComponent } from './components/user/views/post-single/post-single.component';
import { DetailComponent } from './components/user/views/history/detail/detail.component';

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
      // {
      //   path: 'manage/booking/detail:did',
      //   loadChildren: () =>
      //     import('./components/admin/booking/edit-booking/edit-booking.module').then(
      //       (m) => m.EditBookingModule
      //     ),
      // },
      {
        path: 'component',
        loadChildren: () =>
          import('./components/admin/component/component.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'manage/post',
        loadChildren: () =>
          import('./components/admin/post/post.module').then(
            (m) => m.PostModule
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
      // { path: 'history', component: HistoryComponent },
      {
        path: 'history',
        loadChildren: () =>
          import('./components/user/views/history/history.module').then(
            (m) => m.HistoryModule
          ),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./components/user/views/post/post.module').then(
            (m) => m.PostModule
          )
      },
      {
        path: 'post-single/:id',
        loadChildren: () =>
          import('./components/user/views/post-single/post-single.module').then(
            (m) => m.PostSingleModule
          )
      },
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
