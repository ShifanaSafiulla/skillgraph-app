import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    targetCareer: {
      type: String,
      default: 'Python Developer'
    },
    role: {
      type: String,
      default: 'Student'
    },
    skillsCount: {
      type: Number,
      default: 0
    },
    careerReadiness: {
      type: Number,
      default: 0
    },
    roadmapProgress: {
      type: Number,
      default: 0
    },
    codingChallengesCompleted: {
      type: Number,
      default: 0
    },
    averageAssessmentScore: {
      type: Number,
      default: 0
    },
    isSeedRecord: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
