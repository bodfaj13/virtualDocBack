const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');
const bcrypt = require('bcrypt');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

module.exports = {
  registerAdmin(req, res, next){
    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var createdAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");

    var adminDetails = { 
      fullName: fullName, 
      email: email, 
      password: password, 
      createdAt: createdAt 
    };

    bcrypt.hash(adminDetails.password, 10, function(err, hash){
        if(err)throw err;
        adminDetails.password = hash;
        
        Admin.findOne({ email: adminDetails.email })
        .then(function(data) {
          if (!data) {
            var admin = new Admin(adminDetails);
            admin
              .save()
              .then(function(data) {
              res.send({
                success: "Registration done successfully",
                entity: 'Admin'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
    });
  },
  registerDoctor(req, res, next) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var address = req.body.address;
    var gender = req.body.gender;
    var password = req.body.password;
    var contact = req.body.contact;
    var createdAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");

    var doctorDetails = { 
      fullName: fullName,
      email: email,
      gender: gender,
      password: password,
      contact: contact,
      address: address,
      createdAt: createdAt
    };

    bcrypt.hash(doctorDetails.password, 10, function(err, hash){
        if(err)throw err;
        driverDetails.password = hash;
        
        Driver.findOne({ email: doctorDetails.email })
        .then(function(data) {
          if (!data) {
            var doctor = new Driver(doctorDetails);
            doctor
              .save()
              .then(function(data) {
              console.log(data);
              res.send({
                success: "Registration done successfully",
                entity: 'Doctor'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
    });
  },
  adminLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var adminDetails = {
      email: email,
      password: password
    };

    Admin.findOne({ email: adminDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email Address not found"
          });
        } else {
          bcrypt.compare(adminDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Admin Authentication Successfull",
                adminDetails: data
              });
            } else {
              res.status(403).send({
                error_Password: "Incorrect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  },
  doctorLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var doctorDetails = {
      email: email,
      password: password
    };

    Doctor.findOne({ email: doctorDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email not found"
          });
        } else {
          bcrypt.compare(doctorDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Doctor Authentication Successfull",
                doctorDetails: data
              });
            } else {
              res.status(403).send({
                error_Password: "Incorect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  },
  adminPassUpdate(req, res, next){
    var formerPass = req.body.formerPass;
    var newPass = req.body.newPass;
    
    var Details = {
      formerPass: formerPass,
      newPass: newPass
    };

    var getDecoded = req.decoded.email;
    Admin.findOne({email: getDecoded}).then(function(data){
      bcrypt.compare(Details.formerPass, data.password, function(err,isMatch) {
        if (err) throw err;
          if (isMatch) {
            if(Details.formerPass == Details.newPass){
              res.status(400).send({
                error: "New Password should be different"
              });
            }else{
              bcrypt.hash(Details.newPass, 10, function(err, hash){
                  if(err)throw err;
                  data.password = hash;
                  data.save().then(function(){
                    console.log(data);
                    res.send({
                      success: "Password Updated Successfully",
                      entity: "AdminPassReset"
                    });
                  }).catch(function(error){
                    console.log(error.message);
                    res.status(400).send({
                      error: "Something went wrong"
                    });
                  });
              });
            }
        } else {
          res.status(403).send({
            error_formerPass: "Incorrect Former Password"
          });
        }
      });
    }).catch(function(error){
      console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
    });
  },
  registerPatient(req, res, next) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var address = req.body.address;
    var gender = req.body.gender;
    var password = req.body.password;
    var contact = req.body.contact;
    var createdAt = moment().format("ddd, MM DD YYYY, h:mm:ss a");

    var patientDetails = { 
      fullName: fullName,
      email: email,
      gender: gender,
      password: password,
      contact: contact,
      address: address,
      createdAt: createdAt
    };

    bcrypt.hash(patientDetails.password, 10, function(err, hash){
        if(err)throw err;
        driverDetails.password = hash;
        
        Patient.findOne({ email: patientDetails.email })
        .then(function(data) {
          if (!data) {
            var doctor = new Driver(patientDetails);
            doctor
              .save()
              .then(function(data) {
              console.log(data);
              res.send({
                success: "Registration done successfully",
                entity: 'Patient'
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: error
              });
            });
          } else {
            res.status(400).send({
              error_Email: "Email is already taken"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send({
            error: error
          });
        });
    });
  },
  patientLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var patientDetails = {
      email: email,
      password: password
    };

    Patient.findOne({ email: patientDetails.email })
      .then(function(data) {
        if (!data) {
          res.status(403).send({
            error_Email: "Email not found"
          });
        } else {
          bcrypt.compare(patientDetails.password, data.password, function(err,isMatch) {
            if (err) throw err;
            if (isMatch) {
              data.password = null;
              var tokendata = JSON.stringify(data);
              var token = jwt.sign(tokendata, appdetails.jwtSecret);
              console.log(token);
              res.send({
                token: token,
                success: "Patient Authentication Successfull",
                patientDetails: data
              });
            } else {
              res.status(403).send({
                error_Password: "Incorect password"
              });
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send({
          error: error
        });
      });
  },
  patientPassUpdate(req, res, next){
    var formerPass = req.body.formerPass;
    var newPass = req.body.newPass;
    
    var Details = {
      formerPass: formerPass,
      newPass: newPass
    };

    var getDecoded = req.decoded.email;
    Patient.findOne({email: getDecoded}).then(function(data){
      bcrypt.compare(Details.formerPass, data.password, function(err,isMatch) {
        if (err) throw err;
          if (isMatch) {
            if(Details.formerPass == Details.newPass){
              res.status(400).send({
                error: "New Password should be different"
              });
            }else{
              bcrypt.hash(Details.newPass, 10, function(err, hash){
                  if(err)throw err;
                  data.password = hash;
                  data.save().then(function(){
                    console.log(data);
                    res.send({
                      success: "Password Updated Successfully",
                      entity: "PatientPassReset"
                    });
                  }).catch(function(error){
                    console.log(error.message);
                    res.status(400).send({
                      error: "Something went wrong"
                    });
                  });
              });
            }
        } else {
          res.status(403).send({
            error_formerPass: "Incorrect Former Password"
          });
        }
      });
    }).catch(function(error){
      console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
    });
  },
  doctorPassUpdate(req, res, next){
    var formerPass = req.body.formerPass;
    var newPass = req.body.newPass;
    
    var Details = {
      formerPass: formerPass,
      newPass: newPass
    };

    var getDecoded = req.decoded.email;
    Doctor.findOne({email: getDecoded}).then(function(data){
      bcrypt.compare(Details.formerPass, data.password, function(err,isMatch) {
        if (err) throw err;
          if (isMatch) {
            if(Details.formerPass == Details.newPass){
              res.status(400).send({
                error: "New Password should be different"
              });
            }else{
              bcrypt.hash(Details.newPass, 10, function(err, hash){
                  if(err)throw err;
                  data.password = hash;
                  data.save().then(function(){
                    console.log(data);
                    res.send({
                      success: "Password Updated Successfully",
                      entity: "DoctorPassReset"
                    });
                  }).catch(function(error){
                    console.log(error.message);
                    res.status(400).send({
                      error: "Something went wrong"
                    });
                  });
              });
            }
        } else {
          res.status(403).send({
            error_formerPass: "Incorrect Former Password"
          });
        }
      });
    }).catch(function(error){
      console.log(error.message);
        res.status(400).send({
          error: "Something went wrong"
        });
    });
  }
}