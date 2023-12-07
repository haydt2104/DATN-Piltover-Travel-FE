import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from 'primeng/tree';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    TreeModule
  ]
})
export class DetailModule { }
