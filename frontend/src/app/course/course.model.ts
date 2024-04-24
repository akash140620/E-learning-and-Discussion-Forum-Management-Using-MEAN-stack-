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