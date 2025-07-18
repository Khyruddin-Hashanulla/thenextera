const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contentLink: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  feedback: { type: String, default: '' },
  payoutReleased: { type: Boolean, default: false }
});

module.exports = mongoose.model('Submission', submissionSchema);