import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from './lesson.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})


export class ContentPageComponent implements OnInit {
  lessons: Lesson[] = [];
  filteredLessons: Lesson[] = [];
  searchTerm = '';
  selectedLesson?: Lesson;
  selectedLessonContent?: string;

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    this.lessonService.getLessons()
      .subscribe(lessons => {
        this.lessons = lessons;
        this.filteredLessons = lessons; // Initially set filteredLessons to all lessons
        console.log(lessons);
      }, error => {
        console.error('Error fetching lessons:', error);
        // Handle error
      });
  }

  displayLessonContent(lessonName: string) {
    this.selectedLesson = this.lessons.find(lesson => lesson.name === lessonName);
    this.selectedLessonContent = this.selectedLesson?.content;
  }

  filterLessons() {
    if (this.searchTerm) {
      this.filteredLessons = this.lessons.filter(lesson =>
        lesson.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLessons = this.lessons; // Reset filteredLessons to all lessons if search term is empty
    }
  }

  onSearch() {
    // Prevent default form submission is no longer needed here
    // event.preventDefault();Removed

    this.filterLessons();

    const searchedLesson = this.filteredLessons.find(lesson => lesson.name.toLowerCase() === this.searchTerm.toLowerCase());
    if (searchedLesson) {
      this.displayLessonContent(searchedLesson.name);
    } else {
      // Handle case where no lesson matches the search term
      this.selectedLesson = undefined;
      this.selectedLessonContent = undefined;
      console.warn('No lesson found for search term:', this.searchTerm);
    }
  }
}
