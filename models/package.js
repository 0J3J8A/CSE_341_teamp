const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  destination: { type: String, required: true },   // keep only one definition
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  availability: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);
