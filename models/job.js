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
  status: { type: String, required: true, default: "pending" },
  assignmentDate: {
    type: String,
    default: ''
  },
  // ON NEMA OVA TRI DOLE, KAO NI ADMIN COMMENT
  apartment: String,
  building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  // adminComment: String,
  sentDate: { type: Date, default: Date.now() },
  endDate: Date
});

module.exports = mongoose.model('Job', jobSchema);
