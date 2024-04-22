import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000'; // Replace with your backend API base URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password })
      .pipe(map(response => response.token));
  }

  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
