import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostImage } from 'src/app/models/postimage.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

  }

  public getImagesByIdPost(id: number): Observable<PostImage[]>{
    return this.http.get<PostImage[]>(this.baseUrl + 'api/post/getPostImgById/' + id)
  }

  public setThumbnailPost(id: number): Observable<PostImage>{
    return this.http.get<PostImage>(this.baseUrl + 'api/post/setThumbnailPost/' + id)
  }
}
