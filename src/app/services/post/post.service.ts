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

  public getRandomPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.baseUrl + 'api/post/getRandomPosts')
  }

  public getPostById(id: number): Observable<Post>{
    return this.http.get<Post>(this.baseUrl + 'api/post/getPostById/' + id)
  }

  public getIdUserCmt(): Observable<any>{
    return this.http.get<any>(this.baseUrl + 'api/post/getIdUserCmt')
  }

  public updatePostById(data: any, id: any): Observable<any>{
    return this.http.put<number>(this.baseUrl + 'api/admin/post/updatePost/' + id, data);
  }

  public createPost(postDTO : any): Observable<any>{
    return this.http.post<Post>(this.baseUrl+ 'api/admin/post/create', postDTO);
  }

  public deletePost(id:number): Observable<Post>{
    return this.http.get<Post>(this.baseUrl + 'api/admin/post/removePost/' + id)
  }
}
