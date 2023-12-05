import { ImageService } from './../../../../services/post/image/image.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { PostImage } from 'src/app/models/postimage.model';
import { PostService } from 'src/app/services/post/post.service';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  formGroup: FormGroup
  post!: Post
  postImg: PostImage[]
  postId:number

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private imgService: ImageService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      images: new FormControl([])
    })
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const idNumber = parseInt(id)
      this.postId = idNumber;
      this.getPost(idNumber);
      this.getImg(idNumber)
    }

  }

  onSubmit() {

  }
  public getPost(id: number) {
    console.log("hehe: " + id)
    this.postService.getPostById(id).subscribe((data) => {
      this.formGroup.patchValue(data)
      this.post = data
      console.log(this.formGroup.patchValue(data))
    })
  }

  public getImg(id: number){
    this.imgService.getImagesByIdPost(id).subscribe((data) => {
      this.postImg = data
      console.log(this.postImg)
    })
  }
  public savePost() {
    this.postService.updatePostById(this.formGroup.value, this.postId).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công. Sẽ chuyển hướng sau 3 giây!', life: 3000 });
      // this.router.navigateByUrl('/admin/manage/post/list');
      setTimeout(() => {
        this.router.navigateByUrl('/admin/manage/post/list');
      }, 3000);
    })
  }

  public back() {
    window.history.back();
  }
}
