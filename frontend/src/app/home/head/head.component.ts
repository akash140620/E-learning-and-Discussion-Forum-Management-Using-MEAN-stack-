import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-head',
  standalone: true,
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  constructor( private router: Router) {}
  navigateToDis() {
    this.router.navigate(['/discussion-forum']); // Navigate to '/other-page'
    }
    navig() {
      this.router.navigate(['/login']); // Navigate to '/other-page'
      }
      navigate(){
        this.router.navigate(['/course']);
      }
}