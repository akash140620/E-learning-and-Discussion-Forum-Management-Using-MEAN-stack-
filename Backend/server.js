const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi'); // Added for data validation
const cors = require('cors');

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
  },
  content: {
    type: String,
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
    console.log(res);///
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

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }]
});

// Define validation schema for incoming post data
const validatePost = (post) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    content: Joi.string().min(3).required()
  });
  return schema.validate(post);
};

const Post = mongoose.model('Post', postSchema);

// Define the Reply schema with data validation
const replySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
});

// Define validation schema for incoming reply data
const validateReply = (reply) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    content: Joi.string().min(3).required(),
    postId: Joi.string().required()
  });
  return schema.validate(reply);
};

const Reply = mongoose.model('Reply', replySchema);

// API endpoint to fetch all posts (populate replies)
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('replies');
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch a specific post by ID (optional)
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate('replies');
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to create a new post
app.post('/posts', async (req, res) => {
  // Validate incoming post data
  const { error } = validatePost(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).send('Bad request');
  }
});

// API endpoint to create a new reply
app.post('/replies', async (req, res) => {
  // Validate incoming reply data
  const { error } = validateReply(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const reply = new Reply(req.body);
    const post = await Post.findById(reply.postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    post.replies.push(reply._id);
    await post.save(); // Update post with the new reply ID
    await reply.save(); // Save the reply document
    res.json(reply);
  } catch (err) {
    console.error('Error creating reply:', err);
    // More specific error messages based on the error type
    if (err.name === 'CastError') {
      return res.status(400).send('Invalid reply data format');
    } else {
      return res.status(500).send('Internal server error');
    }
  }
});


app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  // Validate incoming post data
  const { error } = validatePost(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true }); // Return the updated document
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));