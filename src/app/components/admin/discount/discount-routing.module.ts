import { Component } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { InsertDiscountComponent } from './insert-discount/insert-discount.component';

export const DiscountRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DiscountComponent },

      { path: 'insert', component: InsertDiscountComponent},
      {
        path:'edit/:did',component:EditDiscountComponent
      },
    ],
  },
];
