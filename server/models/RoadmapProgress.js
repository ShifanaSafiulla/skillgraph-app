import mongoose from 'mongoose';

const roadmapProgressSchema = new mongoose.Schema(
  {
    resourceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    skillName: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Not Started', 'Learning', 'Completed'],
      default: 'Not Started',
    },
    userNotes: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

const RoadmapProgress = mongoose.models.RoadmapProgress || mongoose.model('RoadmapProgress', roadmapProgressSchema);

export default RoadmapProgress;
