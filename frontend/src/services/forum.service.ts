import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

    private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get<any[]>(`${this.apiUrl}questions`);
  }

  postQuestion(questionText: string) {
    return this.http.post<any>(`${this.apiUrl}questions`, { content: questionText });
  }

  postAnswer(questionId: string, answerText: string) {
    return this.http.post<any>(`${this.apiUrl}questions/${questionId}/answers`, { content: answerText });
  }

  getAnswers(questionId: string) {
    return this.http.get<any[]>(`${this.apiUrl}questions/${questionId}/answers`);
  }
}
