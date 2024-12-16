const mongoose = require('mongoose');


const MONGO_URI = 'mongodb://localhost:27017/userauthentication';

const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1); // Exit the process with failure
    }
  };
  
  module.exports = connectDB;