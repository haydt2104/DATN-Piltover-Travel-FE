import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like.model';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

  }

  public getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl + 'api/post/getAllPosts')
  }

  // public getLikePosts(): Observable<long>{
  //   return this.http.get<
  // }
}
