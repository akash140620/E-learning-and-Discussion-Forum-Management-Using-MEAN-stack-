const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi'); // Added for data validation
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Apply CORS middleware with specific origin allowed
app.use(cors({
  origin: 'http://localhost:4200' // Replace with your Angular app's origin
}));

const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Replace with your actual MongoDB connection string
const connectionString = 'mongodb://localhost:27017/E-learning';

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the Lesson schema with data validation
const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  }
});

// Define validation schema for incoming lesson data
const validateLesson = (lesson) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(10).required()
  });
  return schema.validate(lesson);
};

const Lesson = mongoose.model('Lesson', lessonSchema);

// API endpoint to fetch all lessons
app.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.json(lessons);
  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).send('Internal Server Error'); // More specific error message
  }
});

// API endpoint to fetch a specific lesson by name (optional)
app.get('/lessons/:lessonName', async (req, res) => {
  const lessonName = req.params.lessonName;
  try {
    const lesson = await Lesson.findOne({ name: lessonName });
    if (lesson) {
      res.json(lesson.content);
    } else {
      res.status(404).send('Lesson not found');
    }
  } catch (err) {
    console.error('Error fetching lesson content:', err);
    res.status(500).send('Internal Server Error'); // More specific error message
  }
});

// API endpoint to create a new lesson (optional)
app.post('/lessons', async (req, res) => {
  // Validate incoming lesson data
  const { error } = validateLesson(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message); // Send specific validation error
  }

  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.json(newLesson);
  } catch (err) {
    console.error('Error creating lesson:', err);
    res.status(400).send('Bad request'); // More specific error message (consider details)
  }
});


app.use(bodyParser.json());

const User = require('./user');

// Login endpoint
app.post('/loginUser', async (req, res) => {
  console.log('Entered login endpoint');
  const { email, password } = req.body;

  try {
    // Find user by email and password
    const user = await User.findOne({ email, password });

    if (!user) {
      console.log('Incorrect email or password');
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    console.log('Login successful');
    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error logging in:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Register endpoint
app.post('/insertUser', async (req, res) => {
  console.log('Entered register endpoint');
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('User already exists');
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    console.log('User registered successfully');
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.use(bodyParser.json());
app.use(cors());

const Question = require('./question');

let questions = [{
  id: 1,
  content: 'This is a placeholder question',
  answers: []
}];
let nextQuestionId = 2;

// Get all questions
app.get('/questions', (req, res) => {
  res.json(questions);
});

// Post a new question
app.post('/questions', async (req, res) => {
  try {
    const { content } = req.body;
    const question = new Question({ id: nextQuestionId, content });
    await question.save();
    questions.push(question); // This is optional if you still need to keep questions in memory
    nextQuestionId++;
    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create question' });
  }
});



// Post an answer to a question
app.post('/questions/:questionId/answers', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answerText = req.body.content;

    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    question.answers.push({ content: answerText, date: new Date() });
    await question.save();

    res.status(201).json({ message: 'Answer added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add answer' });
  }
});

// GET answers for a question
app.get('/questions/:questionId/answers', (req, res) => {
  console.log('Entered Get answers for a specific question APIEndpoint')
  const questionId = req.params.questionId;
  Question.findById(questionId, 'answers', (err, question) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving answers');
    } else {
      res.status(200).json(question.answers);
    }
  });
});




const courseSchema = new mongoose.Schema({
  title: String,
  lessons: [{
    title: String,
    content: String,
  }],
});

const Course = mongoose.model('Course', courseSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/courses', async (req, res) => {
  const { title } = req.body;
  try {
    const newCourse = new Course({ title });
    const course = await newCourse.save();
    res.status(201).send(course);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/courses/:courseId/lessons', async (req, res) => {
  const { courseId } = req.params;
  const { title, content } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    course.lessons.push({ title, content });
    const updatedCourse = await course.save();
    res.status(201).send(updatedCourse);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/courses/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    await Course.findByIdAndDelete(courseId);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/courses/:courseId/lessons/:lessonId', async (req, res) => {
  const { courseId, lessonId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    course.lessons = course.lessons.filter(lesson => lesson._id.toString() !== lessonId);
    await course.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});


app.put('/courses/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    course.title = title;
    const updatedCourse = await course.save();
    res.status(200).send(updatedCourse);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/courses/:courseId/lessons/:lessonId', async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { content } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).send('Lesson not found');
    }
    lesson.content = content;
    const updatedCourse = await course.save();
    res.status(200).send(updatedCourse);
  } catch (err) {
    res.status(500).send(err);
  }
});


// GET a course by ID
app.get('/courses/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  Course.findById(courseId, (err, course) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving course');
    } else {
      res.status(200).json(course);
    }
  });
});


// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));