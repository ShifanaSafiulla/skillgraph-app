import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: mongoose.Schema.Types.Mixed, required: true },
    expected: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const codingQuestionSchema = new mongoose.Schema(
  {
    problemId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Question title is required'],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    sampleInput: {
      type: String,
      default: ''
    },
    sampleOutput: {
      type: String,
      default: ''
    },
    testCases: [testCaseSchema],
    score: {
      type: Number,
      default: 100
    },
    starterCode: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const CodingQuestion = mongoose.models.CodingQuestion || mongoose.model('CodingQuestion', codingQuestionSchema);

export default CodingQuestion;
