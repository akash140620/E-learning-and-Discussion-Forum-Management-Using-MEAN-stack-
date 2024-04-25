import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  register(username: string, password: string,name:string,age:number,phone:number,gender:string,addr:string,adhaar:number,role:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, password,name,age,phone,gender,addr,adhaar,role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((response) => {
        if (response.token) {
           localStorage.setItem(this.authTokenKey, response.token);
        }
      })
    );
  }

  logout(): void {
     localStorage.removeItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
     return !!localStorage.getItem(this.authTokenKey);
  }

  getToken(): string | null {
     return localStorage.getItem(this.authTokenKey);
  }
}
