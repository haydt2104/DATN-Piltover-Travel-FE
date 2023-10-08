import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Blog management',
      urls: [{ title: 'Post', url: '/post' }],
    },
    component: PostComponent,
  },
];

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas:[
    NO_ERRORS_SCHEMA
  ]
})
export class PostModule { }
