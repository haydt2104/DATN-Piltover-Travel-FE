import { async } from '@angular/core/testing';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostImage } from 'src/app/models/postimage.model';
import { ImageService } from 'src/app/services/post/image/image.service';
import { PostService } from 'src/app/services/post/post.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  public posts!: Post[];
  public postimg!: PostImage;
  public pathImg: String[] = [];
  constructor(
    private postService: PostService,
    private imgService: ImageService) { }
  public ngOnInit(): void {
    this.getAllPost();
  }

  // private getAllPost() {
  //   this.postService.getAllPosts().subscribe((data) => {
  //     this.posts = data;
  //     console.log(this.posts);
  //   });
  //   console.log("to be counit...")
  //   for (let post of this.posts) {
  //     this.imgService.setThumbnailPost(post.id).subscribe((data) => {
  //       this.pathImg.push(data.path)
  //     })
  //     console.log(post.id)
  //   }
  //   console.log(this.pathImg)
  // }

  private async getAllPost() {
    const data = await this.postService.getAllPosts().toPromise();
    this.posts = data;
    console.log(this.posts);

    for (let post of this.posts) {
      const thumbnailPath = await this.imgService.setThumbnailPost(post.id).toPromise();
      this.pathImg.push(thumbnailPath.path);
      console.log(post.id);
    }

    console.log(this.pathImg);
  }

}
