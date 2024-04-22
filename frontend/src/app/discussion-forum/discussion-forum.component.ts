import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscussionService } from '../../services/forum.service';
import { HttpClient } from '@angular/common/http';

interface Discussion {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  answers: Answer[];
}

interface Answer {
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'app-discussion-forum',
  standalone: true, 
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DiscussionForumComponent implements OnInit {
  discussions: Discussion[] = []; // Replace with initialDiscussion if needed
  newAnswer: string = '';
  baseUrl = 'http://localhost:3000/api'; // Adjust if needed

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Option 1: Fetch all discussions (default behavior)
    // this.getDiscussions();

    // Option 2: Initialize with first discussion (replace with actual logic)
    const initialDiscussion = {
      _id: '123', // Replace with actual ID
      title: 'Sample Discussion',
      content: 'This is the first sample discussion for initialization.',
      createdAt: new Date(),
      answers: []
    };
    this.discussions.push(initialDiscussion);
  }

  getDiscussions() {
    this.http.get<Discussion[]>(`${this.baseUrl}/discussions`)
      .subscribe(discussions => this.discussions = discussions);
  }

  submitAnswer(discussionId: string) {
    this.http.post(`${this.baseUrl}/discussions/${discussionId}/answers`, { content: this.newAnswer })
      .subscribe(() => {
        this.newAnswer = ''; // Clear input field on success
        this.getDiscussions(); // Refresh discussions after submitting answer
      });
  }
}