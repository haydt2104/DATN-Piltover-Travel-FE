import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

  }

  public getLikePosts(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/post/getLikePosts/' + id)
  }

  public checkUserLike(postId: number): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl + 'api/post/checkUserLike?postId=' + postId)
  }

  public doLike(postId: number, isLike: boolean): Observable<Like>{
    return this.http.put<Like>(this.baseUrl + 'api/post/doLike?postId=' + postId, isLike);
  }

  public likePost(postId: number, isLike: boolean): Observable<Like>{
    return this.http.post<Like>(this.baseUrl + 'api/post/likePost?postId=' + postId, isLike);
  }
}
