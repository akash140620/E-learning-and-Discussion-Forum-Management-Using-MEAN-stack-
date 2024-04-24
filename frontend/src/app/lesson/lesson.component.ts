import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/courseservice';
@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  lessons: any[] = [];
  selectedLesson: any;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
      if (courseId) {
        this.courseService.getCourseById(courseId).subscribe(course => {
          this.lessons = course.lessons;
        });
      }
    });
  }

  selectLesson(lesson: any): void {
    this.selectedLesson = lesson;
  }
}