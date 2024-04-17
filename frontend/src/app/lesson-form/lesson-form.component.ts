import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../content-page/lesson.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent implements OnInit {
  newLesson: Lesson = { name: '', content: '' }; // Initialize new lesson object

  constructor(
    private lessonService: LessonService,
    private router: Router // Inject Router service
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.lessonService.addLesson(this.newLesson)
      .subscribe(() => {
        // Handle successful lesson creation
        this.router.navigate(['/lessons']); // Navigate back to lessons list on success
      },
      (error) => {
        console.error('Error creating lesson:', error);
        // Handle creation error (optional: display user-friendly message)
      });
  }
}
