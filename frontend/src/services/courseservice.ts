import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}courses`);
  }

  addCourse(courseTitle: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}courses`, { title: courseTitle });
  }

  addLesson(courseId: string, lessonTitle: string, lessonContent: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}courses/${courseId}/lessons`, { title: lessonTitle, content: lessonContent });
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}courses/${courseId}`);
  }

  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}courses/${courseId}/lessons/${lessonId}`);
  }

  updateCourseTitle(courseId: string, newTitle: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}courses/${courseId}`, { title: newTitle });
  }

  updateLessonContent(courseId: string, lessonId: string, newContent: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}courses/${courseId}/lessons/${lessonId}`, { content: newContent });
  }

}
