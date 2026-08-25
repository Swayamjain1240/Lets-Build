import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reportedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    reason: {
      type: String,
      required: [true, 'Report reason is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'REVIEWED', 'RESOLVED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;