import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  formGroup: FormGroup
  post!: Post
  isSubmited = false

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    })
  }

  public savePost() {
    if (this.formGroup.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Thêm mới thất bại' });
    } else {
      this.isSubmited = true
      this.postService.createPost(this.formGroup.value).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thêm mới thành công. Sẽ chuyển hướng sau 3 giây!', life: 3000 });
        setTimeout(() => {
          this.router.navigateByUrl('/admin/manage/post/list');
        }, 3000);
      })
    }
  }

  public back() {
    window.history.back();
  }

  validation_message = {
    title: [
      { type: 'required', message: 'Vui lòng nhập tiêu đề' }
    ],
    description: [
      { type: 'required', message: 'Vui lòng nhập mô tả' }
    ],
    content: [
      { type: 'required', message: 'Vui lòng nhập nội dung' }
    ]
  }
}
