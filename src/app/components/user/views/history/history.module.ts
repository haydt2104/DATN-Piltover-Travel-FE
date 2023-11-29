import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailModule } from './detail/detail.module';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './history.component';
import { RouterModule } from '@angular/router';
import { HistoryRounter } from './history-rounting.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DetailModule,
    HttpClientModule,
    RouterModule.forChild(HistoryRounter),
    ]
})
export class HistoryModule { }
