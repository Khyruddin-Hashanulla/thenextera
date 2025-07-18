const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issuedAt: { type: Date, default: Date.now },
  certificateId: { type: String, unique: true },
  downloadLink: { type: String }
});

module.exports = mongoose.model('Certificate', certificateSchema);