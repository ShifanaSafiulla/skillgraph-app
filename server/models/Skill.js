import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    level: {
      type: String,
      required: [true, 'Skill level is required'],
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced'],
        message: '{VALUE} is not a valid skill level',
      },
      default: 'Beginner',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    icon: {
      type: String,
      default: 'Code',
    }
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development reloads
const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default Skill;
