var mongoose = require('../config/mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var doctorsSchema = mongoose.Schema({
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
    type: String
  },
  stillActive: {
      type: Boolean,
      required: true,
      default: true
  },
  createdAt: {
    type: String
  },
  specialization: {
    type: String
  },
  gender: {
    type: String
  },
  contactNo: {
    type: String,
    unique: true,
    required: true
  },
  inHospital: {
    type: Boolean
  },
  homeAddress:{
    type: String
  },
  complaints: [{
    type: Schema.Types.ObjectId
  }],
  patientId: [{
    type: Schema.Types.ObjectId
  }],
});

var Doctor = mongoose.model('doctors', doctorsSchema);
module.exports = Doctor

