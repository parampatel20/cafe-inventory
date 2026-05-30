const mongoose = require('mongoose');

const deleteLogSchema = new mongoose.Schema({
  itemName:   { type: String, required: true },
  category:   { type: String },
  quantity:   { type: Number },
  unit:       { type: String },
  price:      { type: Number },
  stockType:  { type: String },
  deletedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('DeleteLog', deleteLogSchema);
