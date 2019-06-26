const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: String, required: true },
  // on ima samo string za room
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  comment: String,
  workorder: { type: mongoose.Schema.Types.ObjectId, ref: 'Workorder' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  //namesti za status da ima created, pa onda da ima sent, i onda na kraju finished
  status: { type: String, default: "pending" },
  assignmentDate: {
    type: String,
    default: ''
  },
  // ON NEMA OVO DOLE
  apartmentNumber: String,
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  finishedDate: { type: Date, default: Date.now() },
  // adminComment: String,
  // endDate: Date
});

module.exports = mongoose.model('Job', jobSchema);
