import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../utils';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { IPost, PostsRequestPayload, PostsResponsePayload } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl: string = `${BACKEND_URL}/posts`;

  constructor(private http: HttpClient) {}

  getPosts(
    postsRequestPayload: PostsRequestPayload
  ): Observable<PostsResponsePayload> {
    return this.http
      .post<PostsResponsePayload>(this.postUrl, postsRequestPayload)
      .pipe(
        tap((data) =>
          console.log(
            'The data retrieved from the backend containing the posts: ' +
              JSON.stringify(data)
          )
        ),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
