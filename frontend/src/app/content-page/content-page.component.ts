import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service'; // Import your LessonService
import { Lesson } from './lesson.model'; // Import your Lesson interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for NgFor directive
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})
export class ContentPageComponent implements OnInit {
  lessons: Lesson[] = []; // Array to store fetched lessons
  selectedLesson?: Lesson; // Optional type for selected lesson (can be null)
  selectedLessonContent?: string; // Optional type for selected lesson content

  constructor(private lessonService: LessonService) {}
  ngOnInit() {
    this.lessonService.getLessons()
      .subscribe(lessons => {
        this.lessons = lessons;
        console.log(lessons); // Optional
      }, error => {
        console.error('Error fetching lessons:', error);
        // Handle error
      });
  }
  displayLessonContent(lessonName: string) {
    // Implement logic to display content based on lesson name
    this.selectedLesson = this.lessons.find(lesson => lesson.name === lessonName);
    this.selectedLessonContent = this.selectedLesson?.content; // Access content if lesson is selected
  }
}
