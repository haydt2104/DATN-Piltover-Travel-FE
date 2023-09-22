import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
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

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AuthorizationsComponent,
    TestPipePipe,
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
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
