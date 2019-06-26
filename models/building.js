const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
  number: { type: Number, required: true },
  adress: { type: String, required: true },
  // on nema ova tri dole
  region: { type: String, required: true },
  regionId: { type: Number },
  zip: { type: Number, required: true }
});

module.exports = mongoose.model('Building', buildingSchema);
