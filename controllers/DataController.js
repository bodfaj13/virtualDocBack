const Admin = require('../models/adminModel');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Complaint = require('../models/complaintsModel');

module.exports = {
  getPatientComplaint(req, res, next){
    var patientId = req.body.patientId;
    console.log(patientId)
    Complaint.find({patientId: patientId}).then(function(data){
      console.log(data)
      res.send({
        data: data
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getPatientActiveComplaint(req, res, next){
    var patientId = req.body.patientId;
    console.log(patientId)
    Complaint.find({patientId: patientId, stillActive: true, triggered: true}).then(function(data){
      console.log(data)
      res.send({
        data: data
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getPatientResolvedComplaint(req, res, next){
    var patientId = req.body.patientId;
    console.log(patientId)
    Complaint.find({patientId: patientId, stillActive: false, triggered: true}).then(function(data){
      console.log(data)
      res.send({
        data: data
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getDoctorComplaint(req, res, next){
    var doctorId = req.body.doctorId;
    console.log(doctorId)
    Complaint.find({doctorId: doctorId}).then(function(data){
      console.log(data)
      res.send({
        data: data
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getDoctortActiveComplaint(req, res, next){
    var doctorId = req.body.doctorId;
    console.log(doctorId)
    Complaint.find({doctorId: doctorId, stillActive: true, triggered: true}).then(function(data){
      console.log(data)
      res.send({
        data: data
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getDoctorResolvedComplaint(req, res, next){
    var doctorId = req.body.doctorId;
    console.log(doctorId)
    Complaint.find({doctorId: doctorId, stillActive: false, triggered: true}).then(function(data){
      console.log(data)
      res.send({
        data: data
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getDoctor(req, res, next){
    Doctor.find({}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getPatient(req, res, next){
    Patient.find({}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getDoctorsAvailable(req, res, next){
    Patient.find({inHospital: true}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }, 
  getActiveComplaint(req, res, next){
    Complaint.find({stillActive: true, triggered: true, doctorId: null}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getAnsweredComplaint(req, res, next){
    Complaint.find({stillActive: false, triggered: true}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }
};