import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/courseservice';
import { CommonModule } from '@angular/common';
interface Course {
  _id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  _id: string;
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
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  exploreCourse(course: Course): void {
    // Navigate to the course details page or perform any other action
  }
}