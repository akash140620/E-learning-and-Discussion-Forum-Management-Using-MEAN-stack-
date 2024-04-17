import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-display.component.html',
  styleUrl: './course-display.component.css'
})
export class CourseDisplayComponent {
  course = [
    {title : "C programming", content: "Unleash the power of programming with our comprehensive course. Dive deep into the syntax and concepts, and emerge as a proficient coder!"},
    {title : "Python Programming", content: "Unleash the power of programming with our comprehensive course. Dive deep into the syntax and concepts, and emerge as a proficient coder!"},
    {title : "Java Programming", content: "Unleash the power of programming with our comprehensive course. Dive deep into the syntax and concepts, and emerge as a proficient coder!"},
    {title : "C++ programming", content: "Unleash the power of programming with our comprehensive course. Dive deep into the syntax and concepts, and emerge as a proficient coder!"},
  ]
}
