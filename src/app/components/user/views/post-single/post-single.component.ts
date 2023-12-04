import { LikeService } from 'src/app/services/post/like/like.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { PostImage } from 'src/app/models/postimage.model';
import { CommentService } from 'src/app/services/post/comment/comment.service';
import { ImageService } from 'src/app/services/post/image/image.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent {

  post!: Post
  imgs: PostImage[]
  cmt: Comment[]
  countCmt: number = 0
  addCmt: FormGroup
  editCmt: FormGroup
  LikeClick: FormGroup
  message_validition: String
  idPost: number
  editId: number
  countLike: number
  userLike: boolean

  randomPost: Post[] = []

  p: number = 1;
  itemsPerPage: number = 10;
  totalItem: any;

  constructor(
    private postService: PostService,
    private imgService: ImageService,
    private cmtService: CommentService,
    private likeService: LikeService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const idNumber = parseInt(id)
      this.idPost = idNumber
      this.getPost(idNumber);
      this.getImg(idNumber);
      this.getComment(idNumber);
    }
    this.checkLike(this.idPost);
    this.getCountLike(this.idPost)
    this.addCmt = this.form.group({
      postId: new FormControl(this.idPost),
      content: new FormControl('', [Validators.required])
    })
    this.getRandomPost();
  }

  public getPost(id: number) {
    this.postService.getPostById(id).subscribe((data) => {
      this.post = data
    })
  }

  public getImg(id: number) {
    this.imgService.getImagesByIdPost(id).subscribe((data) => {
      this.imgs = data
    })
  }

  public getComment(id: number) {
    this.cmtService.getCommentByIdPost(id).subscribe((data) => {
      this.cmt = data
      this.countCmt = this.cmt.length
      this.totalItem = this.cmt.length
    })
  }

  public saveComment() {
    this.message_validition = null
    for (let validation of this.validation_message.cmt) {
      if (this.addCmt.get('content')!.value.length == 0) {
        this.message_validition = validation.message
      }
      else {
        this.cmtService.addComment(this.addCmt.value).subscribe((data) => {
          this.getComment(this.idPost);
        })
        this.addCmt.get('content').setValue('')
      }
    }
  }

  public removeCmt(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc rằng bạn muốn xóa bài đăng này?',
      header: 'THÔNG BÁO',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cmtService.removeComment(id).subscribe((data) => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã comment thành công' });
          this.getComment(this.idPost);
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Hủy bỏ', detail: 'Bạn đã hủy hành động' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Hủy ', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  public async getRandomPost() {
    this.postService.getRandomPosts().subscribe(async (data) => {
      this.randomPost = data
      for (let post of this.randomPost) {
        const thumbnailPath = await this.imgService.setThumbnailPost(post.id).toPromise();
        post.path = thumbnailPath.path
      }
    })
  }

  public async getCommentId(id: number) {
    this.editId = id
    this.editCmt = this.form.group({
      cmtId: new FormControl(id),
      content: new FormControl('', [Validators.required])
    })
  }

  public setCommentId() {
    this.editId = null
  }
  public editComment(id: number) {
    this.cmtService.updateComment(id, this.editCmt.value).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã sửa comment thành công' });
      this.editId = null
      this.getComment(this.idPost);
    })
  }

  public doLike() {
    if (this.userLike == true) {
      this.likeService.doLike(this.idPost, false).subscribe((data) => {
        this.getCountLike(this.idPost)
        this.checkLike(this.idPost)
      })
    } else if (this.userLike == false) {
      this.likeService.doLike(this.idPost, true).subscribe((data) => {
        this.getCountLike(this.idPost)
        this.checkLike(this.idPost)
      })
    } else if (this.userLike == null){
      this.likeService.likePost(this.idPost, true).subscribe((data) => {
        this.getCountLike(this.idPost)
        this.checkLike(this.idPost)
      })
    }

  }

  public getCountLike(postId: number) {
    this.likeService.getLikePosts(postId).subscribe((data) => {
      this.countLike = data
    })
  }
  public checkLike(postId: number) {
    this.likeService.checkUserLike(postId).subscribe((data: boolean) => {
      this.userLike = data
    })
  }

  validation_message = {
    cmt: [
      { type: 'required', message: 'Vui lòng nhập comment' }
    ]
  }
}
