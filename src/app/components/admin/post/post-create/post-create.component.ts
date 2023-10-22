import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      console.log('Lỗi')
    } else {
      this.isSubmited = true
      this.postService.createPost(this.formGroup.value).subscribe(data => {
        console.log(this.formGroup.value)
        // alert("Thêm mới thành công")
        // this.router.navigateByUrl('/admin/manage/post/list')
      })
    }
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
