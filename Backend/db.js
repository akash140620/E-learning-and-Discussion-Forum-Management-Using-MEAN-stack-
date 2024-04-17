const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017'; // Replace with your connection string

mongoose.connect(uri)
      .then(() => console.log('MongoDB connected successfully'))
      .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;