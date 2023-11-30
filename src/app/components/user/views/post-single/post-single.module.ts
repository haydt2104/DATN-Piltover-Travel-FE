import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostSingleComponent } from './post-single.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    data: [],
    component: PostSingleComponent,
  },
];

@NgModule({
  declarations: [
    PostSingleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    GalleriaModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    NgxPaginationModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
})
export class PostSingleModule { }
