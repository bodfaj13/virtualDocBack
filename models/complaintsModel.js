var mongoose = require('../config/mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var complaintsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stillActive: {
    type: Boolean
  },
  doctorId: {
    type: Schema.Types.ObjectId
  },
  doctorName: {
    type: String
  },
  doctorRemark: {
    type: String
  },
  createdAt: {
    type: String
  },
  level: {
    type: String
  },
  patientId: {
    type: String,
    required: true
  },
  updateAt: {
    type: String
  },
  triggered: {
    type: Boolean
  },
  startDate: {
    type: String,
    required: true
  },
  medicalPrescrption: {
    type: String
  }
});

var Complaint = mongoose.model('complaints', complaintsSchema);
module.exports = Complaint

