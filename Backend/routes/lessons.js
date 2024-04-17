const express = require('express');
const router = express.Router();
const Lesson = require('../models/lesson');

// Get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).json({ message: 'Error fetching lessons' });
  }
});

// (Optional) Add other CRUD endpoints if needed:
// - Create a lesson
// - Get a specific lesson by ID
// - Update a lesson
// - Delete a lesson

module.exports = router;