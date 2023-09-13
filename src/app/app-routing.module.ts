import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './admin/layouts/full/full.component';
import { LayoutComponent } from './user/layouts/layout/layout.component';
import { HomeComponent } from './user/views/home/home.component';
import { PageNotFoundComponent } from './user/views/page-not-found/page-not-found.component';
import { AboutComponent } from './user/views/about/about.component';
import { ContactComponent } from './user/views/contact/contact.component';
import { HistoryComponent } from './user/views/history/history.component';
import { HistoryDetailComponent } from './user/views/history-detail/history-detail.component';
import { BlogComponent } from './user/views/blog/blog.component';
import { BlogSingleComponent } from './user/views/blog-single/blog-single.component';
import { DestinationComponent } from './user/views/destination/destination.component';
import { DestinationDetailComponent } from './user/views/destination-detail/destination-detail.component';
import { ForgotpassComponent } from './user/authorizations/forgotpass/forgotpass.component';
import { SignUpComponent } from './user/authorizations/sign-up/sign-up.component';
import { LoginComponent } from './user/authorizations/login/login.component';
import { AuthorizationsComponent } from './user/authorizations/authorizations.component';

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
    ]
  },
  {
    path: 'authorization',
    component: AuthorizationsComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent},
      { path: 'forgot-pass', component: ForgotpassComponent}
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
