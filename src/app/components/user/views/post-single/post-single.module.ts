import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { PostSingleComponent } from './post-single.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Post Single',
      urls: [{ title: 'Post Single', url: '/post-single' }],
    },
    component: PostSingleComponent,
  },
];

@NgModule({
  declarations: [
    PostSingleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostSingleModule { }
