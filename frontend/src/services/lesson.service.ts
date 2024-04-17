import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../app/content-page/lesson.model';
import { Observable } from 'rxjs'; // Import Observable
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/lessons';

  baseUrl = 'http://localhost:3000/lessons'; // Backend API base URL

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('http://localhost:3000/lessons'); // Replace with your API endpoint
  }
  
  getLessonContent(lessonName: string): Promise<string> {
    return this.http.get<string>(`${this.baseUrl}/${lessonName}`)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error fetching data:', error);
    return Promise.reject(error.message || 'Server error'); // Provide user-friendly error
  }

  addLesson(lesson: Lesson): Observable<Lesson> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set appropriate headers
    return this.http.post<Lesson>(this.apiUrl, lesson, { headers }); // Send a POST request
  }
}
