import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    TreeModule,
    AccordionModule,
    NgFor,
    DividerModule
  ]
})
export class DetailModule { }
