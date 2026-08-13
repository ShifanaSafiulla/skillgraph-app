import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true
    },
    platform: {
      type: String,
      required: [true, 'Platform name is required'],
      trim: true
    },
    career: {
      type: String,
      required: [true, 'Target career is required'],
      trim: true
    },
    skill: {
      type: String,
      required: [true, 'Associated skill is required'],
      trim: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    type: {
      type: String,
      enum: ['Free', 'Paid'],
      default: 'Free'
    },
    certificateAvailable: {
      type: Boolean,
      default: false
    },
    duration: {
      type: String,
      default: 'Self-paced'
    },
    url: {
      type: String,
      required: [true, 'Course URL is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
