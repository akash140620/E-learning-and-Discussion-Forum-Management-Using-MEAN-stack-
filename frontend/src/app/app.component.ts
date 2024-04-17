import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonService } from '../services/lesson.service';
import { Lesson } from './content-page/lesson.model';  

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet]

})
export class AppComponent {
  title = 'frontend';
  lessons: Lesson[] = []; // Array to store fetched lessons (type: Lesson[])

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    this.lessonService.getLessons() // Assuming 'getLessons' exists in LessonService
      .subscribe(lessons => {
        this.lessons = lessons; // Store lessons after receiving them
        console.log(lessons); // Optional: Log lessons for debugging
      }, error => {
        console.error('Error fetching lessons:', error);
        // Handle error gracefully (display message, etc.)
      });
  }
}