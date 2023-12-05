import { async } from '@angular/core/testing';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostImage } from 'src/app/models/postimage.model';
import { ImageService } from 'src/app/services/post/image/image.service';
import { PostService } from 'src/app/services/post/post.service';
import { Observable, map } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  public posts!: Post[];
  public postimg!: PostImage;
  // public pathImg: String[] = [];

  p: number = 1;
  itemsPerPage: number = 9;
  totalItem: any;
  constructor(
    private postService: PostService,
    private imgService: ImageService,
    private primengConfig: PrimeNGConfig) { }
  public ngOnInit(): void {
    this.getAllPost();
    this.primengConfig.ripple = true
  }

  private async getAllPost() {
    const data = await this.postService.getAllPosts().toPromise();
    this.posts = data;
    this.totalItem =data.length
    console.log(this.posts);

    for (let post of this.posts) {
      const thumbnailPath = await this.imgService.setThumbnailPost(post.id).toPromise();
      // this.pathImg.push(thumbnailPath.path);
      post.path = thumbnailPath.path
      console.log(post.path);
    }

    // console.log(this.pathImg);
  }

}
