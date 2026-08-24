import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    // Sensitive idea details - strictly hidden from public feeds
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // References to canonical Skill documents required for this project
    requiredSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    // Preserved raw string array for fast AI microservice recommendation queries
    rawRequiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['IDEATION', 'IN_PROGRESS', 'COMPLETED'],
      default: 'IDEATION',
    },
    teamMembers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          default: 'Collaborator',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;