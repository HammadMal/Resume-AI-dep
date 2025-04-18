const mongoose = require('mongoose');

const analysisUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number,
    default: 1
  }
});

// Add index for querying by userId and date
analysisUsageSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('AnalysisUsage', analysisUsageSchema);