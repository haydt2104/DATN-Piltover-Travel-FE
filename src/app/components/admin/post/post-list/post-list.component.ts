import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  posts!: Post[];
  post!: Post;
  likeCount: number[] = [];

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.getAllPost();
  }

  public getAllPost() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      for (let i = 0; i < this.posts.length; i++) {
        console.log(this.posts[i])
        // this.getLikePost(this.posts[i].id, i);
      }
    });
  }

  public getLikePost(id: number) {
    this.postService.getLikePosts(id).subscribe((data: number) => {
      // return this.likeCount[index] = data;
      return data;
    });
  }

  public getPostById(id: number) {
    this.postService.getPostById(id).subscribe((data) => {
      this.post = data;
    })
  }

  public removePostById(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc rằng bạn muốn xóa bài đăng này?',
      header: 'THÔNG BÁO',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.deletePost(id).subscribe((data) => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã xóa bài đăng thành công' });
          this.getAllPost();
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

}
