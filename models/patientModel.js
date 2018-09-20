var mongoose = require('../config/mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var patientsSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  contactNo: {
    type: String,
    unique: true,
    required: true
  },
  stillActive: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: String
  },
  complaints: [{
    type: Schema.Types.ObjectId
  }],
  homeAddress: {
    type: String
  },
  gender: {
    type: String
  },
  ageGroup: {
    type: String
  }
});

var Patient = mongoose.model('patients', patientsSchema);
module.exports = Patient

