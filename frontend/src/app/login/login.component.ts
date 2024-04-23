import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginData).subscribe(
      (res) => {
        // Set authentication status assuming successful login
        this.authService.setAuthenticationStatus(true);
        this.router.navigate(['/home']); // Navigate to home page
      },
      (err) => {
        // Show alert for any error, including incorrect email or password
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
