import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  public posts!: Post[];
  constructor(private postService: PostService){}
  public ngOnInit(): void {
    this.getAllPost();
  }

  private getAllPost(){
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }
}
