import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, finalize } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  formCreatePost: FormGroup
  post!: Post
  isSubmited = false
  files: any[] = []
  urlImgs: any[] = []
  // pathImg: any[] = []

  downloadURL: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.formCreatePost = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      images: new FormControl([])
    })
  }

  public async savePost() {
    if (this.formCreatePost.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Thêm mới thất bại' });
    } else {
      this.isSubmited = true
      const pathImg = []
      for (const file of this.files) {
        const fileName = this.getCurrentDateTime() + "_" + file.name;
        const uploadTask = await this.storage.upload(fileName,file);
        const path = await uploadTask.ref.getDownloadURL()
        pathImg.push(path);
        console.log(path)
      }
      console.log(pathImg)
      this.formCreatePost.patchValue({images: pathImg})
      console.log(this.formCreatePost.value)
      this.postService.createPost(this.formCreatePost.value).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thêm mới thành công. Sẽ chuyển hướng sau 3 giây!', life: 3000 });
        setTimeout(() => {
          this.router.navigateByUrl('/admin/manage/post/list');
        }, 3000);
      })
    }
  }

  onUpload(event: any) {
    this.urlImgs.length = 0
    this.files = event.target.files;
    // console.log(this.files)
    for (const file of this.files) {
      let str: string = window.URL.createObjectURL(file);
      let arr = str.split(',');
      this.urlImgs.push(str);

    }
    // console.log(this.urlImgs)
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  public back() {
    window.history.back();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
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
