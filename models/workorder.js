const mongoose = require('mongoose');

const workorderSchema = mongoose.Schema({
  // on ima samo number, a adress ima kao poseban property
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  apartmentNumber: {
    type: Number,
    required: true
  },
  loginTime: {
    type: Date,
    required: true
  },
  completedTime: {
    type: Date,
    required: true
  },
  sendTime: {
    type: Date,
    required: true
  },
  comment: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending', required: true },
  // on nema jobs
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

module.exports = mongoose.model('Workorder', workorderSchema);
