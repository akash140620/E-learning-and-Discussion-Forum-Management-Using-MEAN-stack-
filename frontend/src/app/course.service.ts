import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Lesson {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  apiUrl = 'http://localhost:your_backend_port/lessons'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl);
  }
}
