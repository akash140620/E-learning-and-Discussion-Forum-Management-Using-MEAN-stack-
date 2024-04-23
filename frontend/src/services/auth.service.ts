import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Your backend API base URL
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/loginUser`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertUser`, data);
  }

  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }
}
