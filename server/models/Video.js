import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
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
    channelName: {
      type: String,
      required: [true, 'Channel name is required'],
      trim: true
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true
    },
    thumbnailUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
    },
    duration: {
      type: String,
      default: '15 mins'
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

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
