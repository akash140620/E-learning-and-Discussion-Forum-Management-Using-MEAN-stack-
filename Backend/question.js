const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  answers: [{
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Question', questionSchema);