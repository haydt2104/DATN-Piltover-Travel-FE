import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {
    path: 'list',
    data: {},
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
    EditorModule,
    TableModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PostEditComponent,
    PostCreateComponent,
    PostListComponent,
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
})
export class PostModule {}
