import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Discussion {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  answers: Answer[];
}

interface Answer {
  content: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(this.baseUrl);
  }

  submitAnswer(discussionId: string, answerContent: string): Observable<any> {
    const newAnswer: Answer = { content: answerContent, createdAt: new Date() };
    return this.http.put(`<span class="math-inline">\{this\.baseUrl\}/</span>{discussionId}/answers`, newAnswer);
  }
}
