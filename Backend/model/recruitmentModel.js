import mongoose from 'mongoose';

const recruitmentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Recruitment title is required'],
      trim: true,
    },
    publicSummary: {
      type: String,
      required: [true, 'Public summary is required'],
      maxlength: 300,
    },
    requiredSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recruitment = mongoose.model('Recruitment', recruitmentSchema);
export default Recruitment;