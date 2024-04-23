import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = { firstName: '', lastName: '', email: '', password: '', retypePassword: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.registerData.password !== this.registerData.retypePassword) {
      // Show alert if passwords do not match
      alert('Passwords do not match');
      return;
    }

    this.authService.register(this.registerData).subscribe(
      (res) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        if (err.error.message === 'User already exists') {
          alert('User already exists');
        } else {
          alert('Registration error');
        }
      }
    );
  }
}