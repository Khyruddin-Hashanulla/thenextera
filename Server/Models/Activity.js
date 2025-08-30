const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  problemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  level: {
    type: Number,
    default: 0,
    min: 0,
    max: 4
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
activitySchema.index({ userId: 1, date: 1 }, { unique: true });

// Calculate activity level based on problems solved
activitySchema.pre('save', function(next) {
  const count = this.problemsSolved;
  if (count === 0) this.level = 0;
  else if (count <= 2) this.level = 1;
  else if (count <= 5) this.level = 2;
  else if (count <= 8) this.level = 3;
  else this.level = 4;
  next();
});

module.exports = mongoose.model('Activity', activitySchema);
