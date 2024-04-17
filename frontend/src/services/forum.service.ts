import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs';

const API_URL = 'http://localhost:3000/';
const POSTS_URL = API_URL + 'posts';
const REPLIES_URL = API_URL + 'replies';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface Post {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
  replies?: Reply[]; // Optional array of replies
}

interface Reply {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
  postId: number; // Reference to the parent question
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(POSTS_URL);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(POSTS_URL, post, httpOptions)
      .pipe(
        catchError(this.handleError<Post>('addPost'))
      );
  }

  getReplies(postId: number): Observable<Reply[]> {
    const url = REPLIES_URL + `/${postId}`;
    return this.http.get<Reply[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Reply[]>('getReplies'))
      );
  }

  addReply(reply: Reply): Observable<Reply> {
    const url = REPLIES_URL + `/${reply.postId}`;  // Use postId from the reply object
    return this.http.post<Reply>(url, reply, httpOptions)
      .pipe(
        catchError(this.handleError<Reply>('addReply'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: Send the error to remote logging infrastructure
      console.error(operation, 'failed:', error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
