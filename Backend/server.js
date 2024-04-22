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

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
});

// let User = require("./app/models/user");
let user = mongoose.model("insertUser", userSchema);
app.get("/getUser", async (req, res) => {
  // use mongoose to get all students in the database
  try {
    const data = await user.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
app.post("/insertUser", async (req, res) => {
    const fname = req.body.firstname;
    const lname=req.body.lastname;
    const mail=req.body.email;
    const pass=req.body.password;
    console.log("Received data:", { fname, lname, mail, pass }); // Log received data
    const result=await user.insertMany({firstname:fname,lastname:lname,email:mail,password:pass});
});

app.post('/loginUser',async (req,res)=> {
    const mail=req.body.email;
    const pass=req.body.password;
    console.log(mail,pass);
    const resu = await user.findOne({email:mail});
    console.log(resu);
    if(resu==null)
    {
      res.json("invalid username");
    }
    else{
      if(resu.password==pass)
      {
        res.json("success");
      }
      else{
        res.json("invalid password");
      }  
    }
})


// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));