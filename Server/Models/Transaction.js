const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earn', 'withdraw'], required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  method: { type: String }, // Razorpay, UPI, etc.
  referenceId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);