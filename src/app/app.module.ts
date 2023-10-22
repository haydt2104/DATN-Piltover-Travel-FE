import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './components/admin/layouts/full/full.component';

import { NavigationComponent } from './components/admin/shared/header/navigation.component';
import { SidebarComponent } from './components/admin/shared/sidebar/sidebar.component';

import { SpinnerComponent } from './components/admin/shared/spinner.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/user/layouts/layout/layout.component';
import { HeaderComponent } from './components/user/layouts/header/header.component';
import { FooterComponent } from './components/user/layouts/footer/footer.component';
import { AuthorizationsComponent } from './components/user/authorizations/authorizations.component';
import { TestPipePipe } from './pipes/test-pipe.pipe';
import { AccountComponent } from './components/admin/account/account.component';
import { BookingComponent } from './components/admin/booking/booking.component';

import { environment } from './../environments/environment';

import { CheckStatusAccountPipe } from './pipes/check-status-account.pipe';
import { BookingdetailComponent } from './components/admin/bookingdetail/bookingdetail.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    // LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationsComponent,
    TestPipePipe,
    AccountComponent,
    CheckStatusAccountPipe,
    BookingComponent,
    BookingdetailComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    SidebarComponent,
    NavigationComponent,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: 'BASE_URL',
      useValue: environment.apiUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
