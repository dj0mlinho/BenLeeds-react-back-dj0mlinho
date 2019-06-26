const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: {
    type: String,
    required: true
  },
  proffesion: String,
  status: { type: String, default: 'active', required: true },
  // on nema jobs
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

module.exports = mongoose.model('Vendor', vendorSchema);
