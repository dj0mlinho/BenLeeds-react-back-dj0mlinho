const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: String, required: true },
  //room ima izmena jer on imao ovde samo string
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  price: { type: Number, required: true },
  // status: { type: String, required: true, default: 'ready' },
  // quantity: Number,
  // comment: String,
  link: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);
