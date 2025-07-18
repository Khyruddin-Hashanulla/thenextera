const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gigSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  payout: { type: Number, required: true },
  deadline: Date,
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gig', gigSchema);