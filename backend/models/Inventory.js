const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName:    { type: String, required: true },
  category:    { type: String, required: true },
  subCategory: { type: String },
  quantity:    { type: Number, required: true },
  unit:        { type: String, enum: ['kg', 'liter', 'packet', 'box', 'piece'], required: true },
  price:       { type: Number, required: true },
  stockType:   { type: String, enum: ['cafe', 'godown'], default: 'cafe' },
  addedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);