const Admin = require('../models/adminModel');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Complaint = require('../models/complaintsModel');

module.exports = {
  makeComplaint(req, res, next) {
    var title = req.body.title;
    var description = req.body.description;
    var stillActive = true;
    var triggered = true;
    var level = req.body.level;
    var patientId = req.body.patientId;
    var startDate = req.body.startDate;
    var createdAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");
    
    var complaintsDetails = {
      title: title,
      description: description,
      stillActive: stillActive,
      level: level,
      createdAt: createdAt,
      patientId: patientId,
      triggered: triggered,
      startDate: startDate
    };


    var complaint = new Complaint(complaintsDetails);
    complaint
      .save()
      .then(function(data) {
      console.log(data);
      var hold = data;
      Patient.findById(patientId).then(function(data){
        data.complaints.push(hold._id);
        data.save().then(function(data){
          console.log(data);
        });
      })
      res.send({
        success: "Complaint done successfully",
        entity: 'Complaint'
      });
    })
    .catch(function(error) {
      console.log(error.message);
      res.status(400).send({
        error: error
      });
    });
  },
  answerComplaint(req, res, next) {
    var complaintId = req.body.complaintId;
    var doctorId = req.body.doctorId;
    var doctorName = req.body.doctorName;
    var medicalRemark= req.body.medicalRemark;
    var medicalPrescrption= req.body.medicalPrescrption;
    var updateAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");

    var complaintsDetails = {
      updateAt: updateAt,
      doctorId: doctorId,
      medicalRemark: medicalRemark,
      medicalPrescrption: medicalPrescrption,
      doctorName: doctorName
    };

    Complaint.findById(complaintId).then(function(data){
      data.updateAt = complaintsDetails.updateAt;
      data.doctorId = complaintsDetails.doctorId;
      data.medicalRemark = complaintsDetails.medicalRemark
      data.medicalPrescrption = complaintsDetails.medicalPrescrption
      data.doctorName = complaintsDetails.doctorName
      
      data.save().then(function(data){
        console.log(data);
        var hold = data;
        Doctor.findById(doctorId).then(function(data){
          data.complaints.push(hold._id);
          data.patientId.push(hold.patientId);
          data.save().then(function(data){
            console.log(data);
          });
        })
        res.send({
          success: "Complaint answered successfully",
          entity: "Complaint"
        });
      }).catch(function(error){
        console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  acceptTreatment(req, res, next) {
    var complaintId = req.body.complaintId;
    var stillActive = false;
    var updateAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");

    var complaintsDetails = {
      updateAt: updateAt,
      stillActive: stillActive
    };

    Complaint.findById(complaintId).then(function(data){
      data.updateAt = complaintsDetails.updateAt;
      data.stillActive = complaintsDetails.stillActive;

      data.save().then(function(data){
        console.log(data);
        res.send({
          success: "Complaint accepted successfully",
          entity: "Complaint"
        });
      }).catch(function(error){
        console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  changeStatus(req, res, next) {
    var doctorId = req.body.doctorId;
    var inHospital = req.body.inHospital;
    var updateAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");

    var doctorDetails = {
      updateAt: updateAt,
      inHospital: inHospital,
      doctorId: doctorId
    };

    console.log(doctorDetails);

    Doctor.findById(doctorId).then(function(data){
      data.inHospital = doctorDetails.inHospital;
      data.updateAt = doctorDetails.updateAt;

      
      data.save().then(function(data){
        console.log(data);
        res.send({
          success: "Status changed successfully",
          entity: "Doctor",
          data: data
        });
      }).catch(function(error){
        console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
      });
    }).catch(function(error){
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }
};