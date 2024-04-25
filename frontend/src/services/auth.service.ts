import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // Your backend API base URL
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/loginUser`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertUser`, data);
  }
}
