import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts!: Post[];
  post!: Post;
  likeCount: number[] = [];

  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.getAllPost();
  }

  public getAllPost() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      for (let i = 0; i < this.posts.length; i++) {
        this.getLikePost(this.posts[i].id, i);
      }
    });
  }

  public getLikePost(id: number, index: number) {
    this.postService.getLikePosts(id).subscribe((data: number) => {
      return this.likeCount[index] = data;
    });
  }

  public getPostById(id: number){
    this.postService.getPostById(id).subscribe((data) => {
      this.post = data;
    })
  }
}
