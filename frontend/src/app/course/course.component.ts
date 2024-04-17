import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CommonModule } from '@angular/common';

interface Lesson {
  title: string;
  content: string;
}

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})

export class CourseComponent implements OnInit {
  lessons: Lesson[] = [];
  selectedLesson: Lesson | undefined;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getLessons().subscribe(lessons => {
      this.lessons = lessons;
    });
  }

  onSelectLesson(lesson: Lesson): void {
    this.selectedLesson = lesson;
  }
}