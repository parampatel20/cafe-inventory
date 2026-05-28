const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  billNumber:   { type: String, required: true },
  supplierName: { type: String, required: true },
  billDate:     { type: Date, required: true },
  totalAmount:  { type: Number, required: true },
  category:     { type: String, required: true },
  billFile:     { type: String },
  uploadedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);