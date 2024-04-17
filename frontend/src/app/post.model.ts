export interface Post {
    id: number;
    author: string;
    content: string;
    createdAt: Date;
    replies?: Reply[]; // Array of replies (optional)
  }
  
  export interface Reply {
    id: number;
    author: string;
    content: string;
    createdAt: Date;
    postId: number; // Reference to the parent question
  }