import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  formGroup: FormGroup
  post!: Post

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [''],
      email: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      content: new FormControl()
    })
  }

  public savePost(){}
}
