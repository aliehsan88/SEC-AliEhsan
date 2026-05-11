const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Pending Review', 'Interviewing', 'Feedback Needed', 'Rejected', 'Hired'],
      default: 'Pending Review',
    },
    sharedAt: {
      type: Date,
      default: Date.now,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hiringManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeUrl: {
      type: String,
      default: null,
    },
    feedback: {
      type: String,
      default: null,
    },
    decision: {
      type: String,
      enum: ['Next Step', 'Proceed to Hire', 'KIV', 'Rejected', null],
      default: null,
    },
    interviewDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candidate', candidateSchema);
