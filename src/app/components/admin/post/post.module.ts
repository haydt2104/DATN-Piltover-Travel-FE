import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {
    path: 'list',
    data: {
    },
    component: PostListComponent,
  },
  {
    path: 'edit', children: [
      {path: ':id',component: PostEditComponent}
    ]
  },
  {
    path: 'create',
    data:{},
    component: PostCreateComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PostEditComponent,
    PostCreateComponent
  ],
})
export class PostModule {}
