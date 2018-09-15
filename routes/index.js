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


//token space

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
