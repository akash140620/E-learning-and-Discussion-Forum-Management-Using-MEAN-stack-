import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumService } from '../../services/forum.service';
import { Observable } from 'rxjs';

interface Post {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
  replies?: Reply[]; // Optional array of replies
}

interface Reply {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
  postId: number; // Reference to the parent question
}

@Component({
  selector: 'app-discussion-forum',
  standalone: true,
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DiscussionForumComponent implements OnInit {
  posts: Post[] = [];
  showModal = false;
  questionText = '';
  replyText = '';
  
  constructor(private forumService: ForumService) {
    this.posts = [];
  } // Inject your forum service

ngOnInit() {
  this.forumService.getPosts()
    .subscribe(posts => this.posts = posts);
}

toggleModal() {
  this.showModal = !this.showModal;
}

toggleAnswers(postId: number) {
  const visibilityMap = new Map<number, boolean>(); // Replace with your storage mechanism
  visibilityMap.set(postId, !visibilityMap.get(postId) || false); // Update and default to hidden
}

isAnswerSectionVisible(postId: number): boolean {
  const visibilityMap = new Map<number, boolean>(); // Replace with your storage mechanism (same instance)

  // Check if visibility state exists for the postId
  if (!visibilityMap.has(postId)) {
    visibilityMap.set(postId, false); // Set default visibility to hidden
  }

  return visibilityMap.get(postId)!;
}

postQuestion() {
  if (this.questionText.trim() === '') {
    alert('Please enter your question before posting.');
    return;
  }
  const newPost: Post = {
    id: 0, // Replace with actual ID generation logic (handled by server)
    author: 'You', // Replace with actual user name logic
    content: this.questionText,
    createdAt: new Date(),
    replies: [], // Initialize empty replies array
  };
  this.forumService.addPost(newPost)
    .subscribe(post => {
      // Update component state to reflect the new post
      this.posts.unshift(post); // Add the new post to the beginning of the list
      this.questionText = ''; // Clear question text after posting
      this.showModal = false; // Close modal after posting
    });
}

submitReply(postId: number) {
  if (this.replyText.trim() === '') {
    alert('Please enter your reply before submitting.');
    return;
  }

  const newReply: Reply = {
    id: 0, // Replace with actual ID generation logic (handled by server)
    author: 'You', // Replace with actual user name logic
    content: this.replyText,
    createdAt: new Date(),
    postId: postId
  };

  this.forumService.addReply(newReply)
    .subscribe(reply => {
      console.log('Reply from server:', reply); // Log the reply object for inspection

      // Update UI only after successful reply addition (with additional checks)
      const postIndex = this.posts?.findIndex(p => p.id === postId);
      if (postIndex !== -1) {
        this.posts[postIndex]?.replies?.push(reply);
      } else {
        console.warn('Post with ID:', postId, 'not found');
      }
      this.replyText = ''; // Clear reply text after submitting
    });
}


getRepliesForPost(postId: number): Observable<Reply[]> {
  return this.forumService.getReplies(postId); // Call your forum service to fetch replies
}

// ... other component logic
}
