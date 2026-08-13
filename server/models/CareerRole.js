import mongoose from 'mongoose';

const requiredSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, default: 'Beginner' }
  },
  { _id: false }
);

const careerRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Career role name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    requiredSkills: [requiredSkillSchema],
    icon: {
      type: String,
      default: 'Briefcase'
    }
  },
  {
    timestamps: true
  }
);

const CareerRole = mongoose.models.CareerRole || mongoose.model('CareerRole', careerRoleSchema);

export default CareerRole;
