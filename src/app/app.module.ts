import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './components/admin/layouts/full/full.component';

import { NavigationComponent } from './components/admin/shared/header/navigation.component';
import { SidebarComponent } from './components/admin/shared/sidebar/sidebar.component';

import { AngularFireModule } from '@angular/fire/compat';
import { MatPaginatorModule } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/admin/account/account.component';
import { BookingComponent } from './components/admin/booking/booking.component';
// import { BookingdetailComponent } from './components/admin/bookingdetail/bookingdetail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleriaModule } from 'primeng/galleria';
import { DiscountComponent } from './components/admin/discount/discount.component';
import { SpinnerComponent } from './components/admin/shared/spinner.component';
import { AuthorizationsComponent } from './components/user/authorizations/authorizations.component';
import { FooterComponent } from './components/user/layouts/footer/footer.component';
import { HeaderComponent } from './components/user/layouts/header/header.component';
import { DestinationComponent } from './components/user/views/destination/destination.component';
import { HistoryComponent } from './components/user/views/history/history.component';
import { HomeComponent } from './components/user/views/home/home.component';
import { CheckStatusAccountPipe } from './pipes/check-status-account.pipe';
import { TestPipePipe } from './pipes/test-pipe.pipe';

import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from './components/user/authorizations/loading-spinner/loading-spinner.component';
import { LoginComponent } from './components/user/authorizations/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { SignUpComponent } from './components/user/authorizations/sign-up/sign-up.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { AboutComponent } from './components/user/views/about/about.component';
import { ContactComponent } from './components/user/views/contact/contact.component';
// import { LayoutComponent } from './components/user/layouts/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    // LayoutComponent,
    HomeComponent,
    DestinationComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationsComponent,
    TestPipePipe,
    AccountComponent,
    CheckStatusAccountPipe,
    BookingComponent,
    HistoryComponent,
    DiscountComponent,
    LoginComponent,
    SignUpComponent,
    LoadingSpinnerComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: true }),
    FullComponent,
    SidebarComponent,
    NavigationComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    GalleriaModule,
    ProgressSpinnerModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    SliderModule,
    DropdownModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: 'BASE_URL',
      useValue: environment.apiUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
