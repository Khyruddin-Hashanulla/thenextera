const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  },
  // New status field
  status: {
    type: String,
    enum: ['not_started', 'practiced', 'completed'],
    default: 'not_started'
  },
  // New bookmark field
  isBookmarked: {
    type: Boolean,
    default: false
  },
  // Legacy fields for backward compatibility
  practiced: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  bookmarked: {
    type: Boolean,
    default: false
  },
  // Timestamps
  completedAt: {
    type: Date
  },
  lastAttemptedAt: {
    type: Date
  },
  // Code attempts
  lastAttemptCode: {
    language: {
      type: String,
      enum: ['cpp', 'python', 'java', 'javascript']
    },
    code: {
      type: String
    },
    submittedAt: {
      type: Date
    }
  },
  // Attempt history
  attempts: [{
    language: {
      type: String,
      enum: ['cpp', 'python', 'java', 'javascript']
    },
    code: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'timeout', 'error'],
      default: 'pending'
    },
    testCasesPassed: {
      type: Number,
      default: 0
    },
    totalTestCases: {
      type: Number,
      default: 0
    },
    executionTime: {
      type: Number // in milliseconds
    },
    memoryUsed: {
      type: Number // in MB
    },
    errorMessage: {
      type: String
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Statistics
  totalAttempts: {
    type: Number,
    default: 0
  },
  successfulAttempts: {
    type: Number,
    default: 0
  },
  firstCompletedAt: {
    type: Date
  },
  lastAttemptAt: {
    type: Date
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  // Revision tracking
  needsRevision: {
    type: Boolean,
    default: false
  },
  revisionDate: {
    type: Date
  },
  revisionNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Compound indexes for efficient querying
userProgressSchema.index({ userId: 1, problemId: 1 }, { unique: true });
userProgressSchema.index({ userId: 1, topicId: 1 });
userProgressSchema.index({ userId: 1, practiced: 1 });
userProgressSchema.index({ userId: 1, completed: 1 });
userProgressSchema.index({ userId: 1, bookmarked: 1 });
userProgressSchema.index({ userId: 1, needsRevision: 1 });

// Virtual for success rate
userProgressSchema.virtual('successRate').get(function() {
  if (this.totalAttempts === 0) return 0;
  return Math.round((this.successfulAttempts / this.totalAttempts) * 100);
});

// Static method to get user statistics
userProgressSchema.statics.getUserStats = async function(userId) {
  try {
    // Convert string to ObjectId safely
    const userObjectId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    
    const stats = await this.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalProblems: { $sum: 1 },
          practicedProblems: { 
            $sum: { 
              $cond: [
                { $or: ['$practiced', { $eq: ['$status', 'practiced'] }, { $eq: ['$status', 'completed'] }] }, 
                1, 
                0
              ] 
            } 
          },
          completedProblems: { 
            $sum: { 
              $cond: [
                { $or: ['$completed', { $eq: ['$status', 'completed'] }] }, 
                1, 
                0
              ] 
            } 
          },
          bookmarkedProblems: { 
            $sum: { 
              $cond: [
                { $or: ['$bookmarked', '$isBookmarked'] }, 
                1, 
                0
              ] 
            } 
          },
          totalAttempts: { $sum: '$totalAttempts' },
          successfulAttempts: { $sum: '$successfulAttempts' },
          totalTimeSpent: { $sum: '$timeSpent' }
        }
      }
    ]);
    
    return stats[0] || {
      totalProblems: 0,
      practicedProblems: 0,
      completedProblems: 0,
      bookmarkedProblems: 0,
      totalAttempts: 0,
      successfulAttempts: 0,
      totalTimeSpent: 0
    };
  } catch (error) {
    console.error('Error in getUserStats:', error);
    return {
      totalProblems: 0,
      practicedProblems: 0,
      completedProblems: 0,
      bookmarkedProblems: 0,
      totalAttempts: 0,
      successfulAttempts: 0,
      totalTimeSpent: 0
    };
  }
};

// Static method to get topic-wise progress
userProgressSchema.statics.getTopicProgress = async function(userId, topicId) {
  try {
    // Convert strings to ObjectId safely
    const userObjectId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    const topicObjectId = typeof topicId === 'string' ? new mongoose.Types.ObjectId(topicId) : topicId;
    
    const progress = await this.aggregate([
      { 
        $match: { 
          userId: userObjectId,
          topicId: topicObjectId
        } 
      },
      {
        $group: {
          _id: '$topicId',
          totalProblems: { $sum: 1 },
          practicedProblems: { $sum: { $cond: ['$practiced', 1, 0] } },
          completedProblems: { $sum: { $cond: ['$completed', 1, 0] } }
        }
      }
    ]);
    
    return progress[0] || {
      totalProblems: 0,
      practicedProblems: 0,
      completedProblems: 0
    };
  } catch (error) {
    console.error('Error in getTopicProgress:', error);
    return {
      totalProblems: 0,
      practicedProblems: 0,
      completedProblems: 0
    };
  }
};

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
module.exports = UserProgress;
