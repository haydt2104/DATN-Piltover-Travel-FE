import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  public getCommentByIdPost(id: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.baseUrl + 'api/post/getCommentPost/' + id)
  }

  public addComment(commentDTO: any): Observable<any>{
    return this.http.post<Comment>(this.baseUrl+ 'api/post/addComment', commentDTO);
  }

  public removeComment(id: number): Observable<Comment>{
    return this.http.get<Comment>(this.baseUrl + 'api/post/removeComment/' + id)
  }

  public updateComment(id: number, data: any):Observable<any>{
    return this.http.put<number>(this.baseUrl + 'api/post/updateComment/' + id, data);
  }
}
