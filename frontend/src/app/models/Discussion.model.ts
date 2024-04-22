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