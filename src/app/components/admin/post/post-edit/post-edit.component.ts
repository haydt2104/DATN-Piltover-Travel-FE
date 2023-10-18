import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit{

  formGroup: FormGroup
  post!: Post

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id:[''],
      email: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      content: new FormControl()
    })
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null){
      const idNumber = parseInt(id)
      this.getPost(idNumber);
    }

  }

  public getPost(id: number){
    console.log("hehe: " + id)
    this.postService.getPostById(id).subscribe((data) => {
      this.formGroup.patchValue(data)
      console.log(this.formGroup.patchValue(data))
    })
  }

  public savePost(){

    this.postService.updatePostById(this.formGroup.value, this.formGroup.value.id).subscribe(data =>{
      this.router.navigateByUrl('/admin/manage/post/list')
    })
    alert("Cập nhật thành công")
  }
}
