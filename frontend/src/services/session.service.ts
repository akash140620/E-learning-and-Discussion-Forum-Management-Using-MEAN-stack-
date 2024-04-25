import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private is_LoggedIn = false;

  constructor(private router: Router) {}

  login() {
    this.is_LoggedIn = true;
  }

  logout() {
    this.is_LoggedIn = false;
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.is_LoggedIn;
  }
}
