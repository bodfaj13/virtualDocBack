const Admin = require('../models/adminModel');
const appdetails = require('../config/appdetails.json');
const moment = require('moment');


module.exports = {
  getDriversNo(req, res, next){
    Driver.count({}).then(function(data){
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