import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public getPostById(id: number): Observable<Post>{
    return this.http.get<Post>(this.baseUrl + 'api/post/getPostById/' + id)
  }

  public getLikePosts(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/post/getLikePosts/' + id)
  }

  public updatePostById(data: any, id: any): Observable<any>{
    return this.http.put<number>(this.baseUrl + 'api/post/updatePost/' + id, data);
  }

  public createPost(postDTO : any): Observable<any>{
    return this.http.post<Post>(this.baseUrl+ 'api/post/create', postDTO);
  }
}
