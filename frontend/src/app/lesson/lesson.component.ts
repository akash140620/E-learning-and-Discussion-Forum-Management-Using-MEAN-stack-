import { Component, Input } from '@angular/core';
import { Lesson } from '../lesson'; // Replace with your lesson model path

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {

  @Input() lesson: Lesson | null = null;
  
  constructor() { }

}