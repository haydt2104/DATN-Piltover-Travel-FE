import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [DetailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
  ]
})
export class DetailModule { }
