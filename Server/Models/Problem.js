const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  solution: {
    type: {
      type: String,
      enum: ['youtube', 'text', 'code', 'none'],
      default: 'none'
    },
    youtubeLink: {
      type: String,
      validate: {
        validator: function(v) {
          // Only validate if solution type is youtube and value exists
          if (this.parent().type === 'youtube' && v) {
            return v.includes('youtube.com') || v.includes('youtu.be');
          }
          return true;
        },
        message: 'Invalid YouTube link - must contain youtube.com or youtu.be'
      }
    },
    textExplanation: {
      type: String
    },
    codeSnippet: {
      language: {
        type: String,
        enum: ['cpp', 'python', 'java', 'javascript'],
        default: 'cpp'
      },
      code: {
        type: String
      }
    }
  },
  practiceLink: {
    platform: {
      type: String,
      enum: ['LeetCode', 'HackerRank', 'Codeforces', 'GeeksforGeeks', 'InterviewBit', 'Other']
    },
    url: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || v.startsWith('http');
        },
        message: 'Invalid URL format'
      }
    },
    problemId: {
      type: String // Platform-specific problem ID
    }
  },
  hasCodeEditor: {
    type: Boolean,
    default: false
  },
  codeEditorConfig: {
    allowedLanguages: [{
      type: String,
      enum: ['cpp', 'python', 'java', 'javascript']
    }],
    timeLimit: {
      type: Number,
      default: 2000 // milliseconds
    },
    memoryLimit: {
      type: Number,
      default: 256 // MB
    },
    testCases: [{
      input: String,
      expectedOutput: String,
      isHidden: {
        type: Boolean,
        default: false
      }
    }]
  },
  tags: [{
    type: String,
    trim: true
  }],
  companies: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Statistics
  totalAttempts: {
    type: Number,
    default: 0
  },
  successfulSolves: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
problemSchema.index({ topicId: 1, order: 1 });
problemSchema.index({ difficulty: 1 });
problemSchema.index({ tags: 1 });
problemSchema.index({ 'practiceLink.platform': 1 });
problemSchema.index({ isActive: 1 });

// Virtual for success rate
problemSchema.virtual('successRate').get(function() {
  if (this.totalAttempts === 0) return 0;
  return Math.round((this.successfulSolves / this.totalAttempts) * 100);
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
