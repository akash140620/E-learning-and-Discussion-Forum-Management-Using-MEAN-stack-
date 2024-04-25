import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/courseservice';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  courseForm!: FormGroup;
  lessonForm!: FormGroup;
  courses!: any[];
  deleteLessonForm!: FormGroup;
  deleteCourseForm!: FormGroup;
  selectedCourse: any;
  updateCourseForm!:FormGroup;
  updateLessonForm!:FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseTitle: ['', Validators.required]
    });

    this.lessonForm = this.fb.group({
      courseId: ['', Validators.required],
      lessonTitle: ['', Validators.required],
      lessonContent: ['', Validators.required]
    });

    this.loadCourses();

    this.deleteLessonForm = this.fb.group({
      deleteCourseSelect: ['', Validators.required],
      deleteLessonSelect: ['', Validators.required]
    });

    this.deleteCourseForm = this.fb.group({
      deleteCourseSelect: ['', Validators.required]
    });

    this.updateCourseForm = this.fb.group({
      updateCourseSelect: ['', Validators.required],
      newCourseTitle: ['', Validators.required]
    });
    
    this.updateLessonForm = this.fb.group({
      updateCourseSelect: ['', Validators.required],
      updateLessonSelect: ['', Validators.required],
      newLessonContent: ['', Validators.required]
    });
    
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
    });
  }

  addCourse(): void {
    if (this.courseForm.valid) {
      const courseTitle = this.courseForm.value.courseTitle;
      this.courseService.addCourse(courseTitle).subscribe(() => {
        this.courseForm.reset();
        this.loadCourses();
      });
    }
  }

  addLesson(): void {
    if (this.lessonForm.valid) {
      const courseId = this.lessonForm.value.courseId;
      const lessonTitle = this.lessonForm.value.lessonTitle;
      const lessonContent = this.lessonForm.value.lessonContent;
      this.courseService.addLesson(courseId, lessonTitle, lessonContent).subscribe(() => {
        this.lessonForm.reset();
        this.loadCourses();
      });
    }
  }

  deleteCourse(): void {
    const courseId = this.deleteCourseForm.value.deleteCourseSelect;
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses();
    });
  }

  deleteLesson(): void {
    const courseId = this.deleteLessonForm.value.deleteCourseSelect;
    const lessonId = this.deleteLessonForm.value.deleteLessonSelect;
    this.courseService.deleteLesson(courseId, lessonId).subscribe(() => {
      this.loadCourses();
    });
  }

  getSelectedCourse(): any {
    const selectedCourseId = this.deleteLessonForm.value.deleteCourseSelect;
    return this.courses && this.courses.find(course => course._id === selectedCourseId);
  }

  updateCourseTitle(): void {
    const courseId = this.updateCourseForm.value.updateCourseSelect;
    const newTitle = this.updateCourseForm.value.newCourseTitle;
    this.courseService.updateCourseTitle(courseId, newTitle).subscribe(() => {
      this.loadCourses();
    }, error => {
      console.error('Error updating course title:', error);
    });
  }
  
  updateLessonContent(): void {
    const courseId = this.updateLessonForm.value.updateCourseSelect;
    const lessonId = this.updateLessonForm.value.updateLessonSelect;
    const newContent = this.updateLessonForm.value.newLessonContent;
    this.courseService.updateLessonContent(courseId, lessonId, newContent).subscribe(() => {
      this.loadCourses();
    }, error => {
      console.error('Error updating lesson content:', error);
    });
  }

  navig() {
    this.router.navigate(['/login']); // Navigate to '/other-page'
    }
  
}
