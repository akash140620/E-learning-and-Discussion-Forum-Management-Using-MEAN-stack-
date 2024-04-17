const mongoose = require('../db'); // Assuming 'db.js' is in the parent directory

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Lesson', lessonSchema);