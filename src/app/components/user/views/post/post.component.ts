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
    this.loadScripts()
    this.getAllPost();
    this.primengConfig.ripple = true
  }

  loadScripts() {
    // Đường dẫn tới thư mục chứa các tệp JavaScript
    const scriptsPath = 'assets/js/';

    // Tên các tệp JavaScript muốn import
    const scriptFiles = [
      'jquery.min.js',
      'jquery-migrate-3.0.1.min.js',
      'popper.min.js',
      'bootstrap.min.js',
      'jquery.easing.1.3.js',
      'jquery.waypoints.min.js',
      'jquery.stellar.min.js',
      'owl.carousel.min.js',
      'jquery.magnific-popup.min.js',
      'jquery.animateNumber.min.js',
      'bootstrap-datepicker.js',
      'scrollax.min.js',
      'main.js',
    ];

    scriptFiles.forEach((scriptFile) => {
      const script = document.createElement('script');
      script.src = scriptsPath + scriptFile;
      script.type = 'text/javascript';
      script.async = false;
      document.body.appendChild(script);
    });
  }

  private async getAllPost() {
    const data = await this.postService.getAllPosts().toPromise();
    this.posts = data;
    this.totalItem = data.length

    for (let post of this.posts) {
      const thumbnailPath = await this.imgService.setThumbnailPost(post.id).toPromise();
      // this.pathImg.push(thumbnailPath.path);
      post.path = thumbnailPath.path
    }
  }

}
