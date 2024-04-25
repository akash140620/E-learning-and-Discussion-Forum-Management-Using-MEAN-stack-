import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  constructor(private sessionService: SessionService , private router: Router) {}
  navigateToDis() {
    this.router.navigate(['/discussion-forum']); // Navigate to '/other-page'
    }
    navig() {
      this.router.navigate(['/login']); // Navigate to '/other-page'
      }
      navigate(){
        this.router.navigate(['/course']);
      }
      ngOnInit() {
        // Check if user is logged in
        if (!this.sessionService.isLoggedIn) {
          this.sessionService.logout();
        }
      }
}