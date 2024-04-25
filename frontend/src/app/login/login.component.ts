import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(this.loginData.email)) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    if (this.loginData.email === 'admin@gmail.com' && this.loginData.password === 'admin') {
      this.router.navigate(['/admin']); // Navigate to admin page
    }
    else{
      this.authService.login(this.loginData).subscribe(
        (res) => {
          // Set authentication status assuming successful login
          this.router.navigate(['/home']); // Navigate to home page for regular users
        },
        (err) => {
          // Show alert for any error, including incorrect email or password
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }
}
