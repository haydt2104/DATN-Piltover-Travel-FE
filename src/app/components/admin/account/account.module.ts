import { AccountComponent } from './account.component';
import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Account management',
      urls: [{ title: 'Account management', url: '/account' }],
    },
    component: AccountComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
  ],
  declarations: [],
})
export class AccountModule {}
