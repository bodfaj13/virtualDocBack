const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserMsgController = require("../controllers/UserMsgController");
const ControllerPolicy = require("../policies/ControllerPolicy");
const jwt = require("jsonwebtoken");
const appdetails = require("../config/appdetails.json");
const FunctionController = require("../controllers/FunctionController");
const moment = require('moment');
const Admin = require('../models/adminModel');
const Ambulance = require('../models/ambulanceModel');
const Driver = require('../models/driverModel');
const DataController = require('../controllers/DataController');
const Emergency = require('../models/emergencyModel');

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

//registeradmin
router.post(
  "/api/registeradmin",
  ControllerPolicy.registerAdmin,
  AuthController.registerAdmin
);

//admin-update-pass
router.post(
  "/api/adminpassupdate",
  ControllerPolicy.adminPassUpdate,
  AuthController.adminPassUpdate
);

module.exports = router;
