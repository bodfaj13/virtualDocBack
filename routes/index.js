const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const ControllerPolicy = require("../policies/ControllerPolicy");
const jwt = require("jsonwebtoken");
const appdetails = require("../config/appdetails.json");
const FunctionController = require("../controllers/FunctionController");
const moment = require('moment');
const Admin = require('../models/adminModel');
const DataController = require('../controllers/DataController');


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Virtual Doc BackEnd" });
  console.log('Lets get started');
});

router.get("/api", function (req, res, next) {
    res.send({msg: "hello world"});
})

//adminlogin
router.post("/api/adminlogin", AuthController.adminLogin);

//doctorlogin
router.post("/api/doctorlogin", AuthController.doctorLogin);

//patientlogin
router.post("/api/patientlogin", AuthController.patientLogin);


//getpatientcomplaint
router.post("/api/getpatientcomplaints", DataController.getPatientComplaint);

//getpatientactivecomplaint
router.post("/api/getpatientactivecomplaints", DataController.getPatientActiveComplaint);

//getpatientresolvedcomplaint
router.post("/api/getpatientresolvedcomplaints", DataController.getPatientResolvedComplaint);

//getdoctorcomplaint
router.post("/api/getdoctorcomplaints", DataController.getDoctorComplaint);

//getdoctoractivecomplaint
router.post("/api/getdoctoractivecomplaints", DataController.getDoctortActiveComplaint);

//getdoctorresolvedcomplaint
router.post("/api/getdoctorresolvedcomplaints", DataController.getDoctorResolvedComplaint);

//getdoctor
router.get("/api/getdoctor", DataController.getDoctor);

//getpatient
router.get("/api/getpatient", DataController.getPatient);

//getdocvtorsavailable
router.get("/api/getdocvtorsavailable", DataController.getDoctorsAvailable);

//getactivecomplaint
router.get("/api/getactivecomplaint", DataController.getActiveComplaint);

//getansweredcomplaint
router.get("/api/getansweredcomplaint", DataController.getAnsweredComplaint);


//token space
//route middleware to authenticate and check token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-auth"];
  // decode token
  if (token) {
    // verifies secret and checks exp
    try {
      var decoded = jwt.verify(token, appdetails.jwtSecret);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token."
      });
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

//checking explicitly
router.get("/api/check", function(req, res) {
  res.json(req.decoded);
});

//protected routes
router.get("/api/standard", function(req, res) {
  res.send("standard");
});
//tokenspace


//registeradmin
router.post(
  "/api/registeradmin",
  AuthController.registerAdmin
);

//admin-update-pass
router.post(
  "/api/adminupdatepass",
  AuthController.adminPassUpdate
);

//registerdoctor
router.post(
  "/api/registerdoctor",
  AuthController.registerDoctor
);

//doctor-update-pass
router.post(
  "/api/doctorupdatepass",
  AuthController.doctorPassUpdate
);

//registerpatient
router.post(
  "/api/registerpatient",
  AuthController.registerPatient
);

//patient-update-pass
router.post(
  "/api/patientupdatepass",
  AuthController.patientPassUpdate
);

//makereport
router.post(
  "/api/makecomplaint",
  FunctionController.makeComplaint
);

//answerreport
router.post(
  "/api/answercomplaint",
  FunctionController.answerComplaint
);

//accepttreatment
router.post(
  "/api/accepttreatment",
  FunctionController.acceptTreatment
);
module.exports = router;
