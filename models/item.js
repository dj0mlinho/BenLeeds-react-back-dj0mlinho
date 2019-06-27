const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: String, required: true },
  room: { type: String },
  price: { type: Number, required: true },
  link: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);
