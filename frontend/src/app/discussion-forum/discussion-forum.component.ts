import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumService } from '../../services/forum.service';


@Component({
  selector: 'app-discussion-forum',
  standalone: true, 
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DiscussionForumComponent implements OnInit {
    @ViewChild('questionInput') questionInput!: ElementRef;
  questions: any[] = [];
  questionText: string = '';
  answerText: string = '';
  showQuestionModal: boolean = false;
  maxVisibleAnswers: number = 1;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.forumService.getQuestions().subscribe((data: any[]) => {
      this.questions = data;
    });
  }

  openQuestionModal() {
    this.showQuestionModal = true;
    setTimeout(() => this.questionInput.nativeElement.focus(), 0); // Focus textarea after modal is displayed
  }

  postQuestion() {
    if (this.questionText.trim() !== '') {
      this.forumService.postQuestion(this.questionText).subscribe(() => {
        this.questionText = '';
        this.showQuestionModal = false;
        this.loadQuestions();
      });
    }
  }

  toggleAnswers(question: any): void {
    question.showAnswers = !question.showAnswers;
    if (question.showAnswers && !question.answers) {
      this.loadAnswers(question);
    }
  }

  loadAnswers(question: any): void {
    console.log('Entered load answers')
    this.forumService.getAnswers(question._id).subscribe((data: any[]) => {
      question.answers = data;
    });
    console.log(question.answers);
  }

  answerTextMap: { [key: string]: string } = {};

  postAnswer(questionId: string) {
    const answerText = this.answerTextMap[questionId];
    if (answerText && answerText.trim() !== '') {
      this.forumService.postAnswer(questionId, answerText).subscribe(() => {
        this.answerTextMap[questionId] = ''; // Clear the answer text after posting
        this.loadQuestions(); // Reload questions to update answers
      });
    }
  }
}