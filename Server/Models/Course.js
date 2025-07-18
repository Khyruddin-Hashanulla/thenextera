const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  progress: { 
    type: Number, 
    default: 0 
  },
  completedVideos: { 
    type: [Number], 
    default: [] 
  },
  lastWatched: { 
    type: Number, 
    default: 0 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const videoSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    default: 0 
  },
  description: { 
    type: String, 
    default: '' 
  }
});

const sectionSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  order: { 
    type: Number, 
    required: true 
  },
  videos: {
    type: [videoSchema],
    default: undefined,
    required: true,
    validate: {
      validator: function(videos) {
        return Array.isArray(videos) && videos.length > 0;
      },
      message: 'Section must have at least one video'
    }
  }
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  sections: {
    type: [sectionSchema],
    required: true,
    validate: {
      validator: function(sections) {
        return Array.isArray(sections) && sections.length > 0;
      },
      message: 'Course must have at least one section'
    }
  },
  quiz: [
    {
      question: String,
      options: [String],
      correct: Number,
    },
  ],
  creatorId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  studentsEnrolled: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: []
  },
  studentProgress: {
    type: [progressSchema],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to ensure sections and videos are properly structured
courseSchema.pre('save', function(next) {
  try {
    // Update timestamp
    this.updatedAt = new Date();

    // Ensure sections exist
    if (!this.sections) {
      this.sections = [];
    }

    // Sort sections by order
    this.sections.sort((a, b) => (a.order || 0) - (b.order || 0));

    // Update section orders
    this.sections.forEach((section, index) => {
      section.order = index + 1;
    });

    next();
  } catch (error) {
    next(error);
  }
});

// Add indexes for better query performance
courseSchema.index({ creatorId: 1 });
courseSchema.index({ 'studentsEnrolled': 1 });

// Add virtual for total videos count
courseSchema.virtual('totalVideos').get(function() {
  return this.sections.reduce((total, section) => total + (section.videos?.length || 0), 0);
});

// Ensure virtuals are included in JSON
courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);