import mongoose from 'mongoose';

const assessmentAttemptSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  codeSubmitted: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Correct', 'Incorrect'],
    required: true
  },
  scoreAwarded: {
    type: Number,
    default: 0
  },
  passedTestCases: {
    type: Number,
    default: 0
  },
  totalTestCases: {
    type: Number,
    default: 0
  },
  attemptsCount: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AssessmentAttempt = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);
export default AssessmentAttempt;
