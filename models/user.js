const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  // ON NEMA UNIQUE
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailPassword: String,
  name: { type: String, required: true },
  region: { type: String},
  status: { type: String, default: 'active' }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
