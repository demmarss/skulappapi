const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  questionType: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
  questions: {
    type: []
  },
  scoreHistory: {
    type: []
  },
  answerHistory: {
    type: []
  },
  lgroupId: {
    type: [],
  },
  multiAttempt: {
    type: Boolean,
  } 
});

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task; 
