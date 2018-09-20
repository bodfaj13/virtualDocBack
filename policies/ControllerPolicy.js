const Joi = require('joi');

module.exports = {
  registerAdmin (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullName: Joi.string(),
      password: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Invalid Email Address supplied'
          })
          break
        case 'fullName':
          res.status(400).send({
            error_Fullname: 'Invalid Fullname supplied'
          })
          break
        case 'password':
          res.status(400).send({
            error_Password: 'Invalid Password supplied'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Supplied'
          })
      }
    }else{
      next()
    }
  },
  passUpdate (req, res, next){
    const schema = {
      formerPass: Joi.string(),
      newPass: Joi.string()
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){ 
        case 'formerPass':
          res.status(400).send({
            error_formerPass: 'Invalid Password supplied'
          })
          break
        case 'newPass':
          res.status(400).send({
            error_newPass: 'Invalid New Password supplied'
          })
        default:
          res.status(400).send({
            error: 'Invalid Update Supplied'  
          })
      }
    }else{
      next()
    }
  },
  registerPatient (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullName: Joi.string(),
      password: Joi.string(),
      homeAddress: Joi.string(),
      gender: Joi.string(),
      contactNo: Joi.string(),
      ageGroup: Joi.string(),
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Invalid Email Address supplied'
          })
          break
        case 'fullName':
          res.status(400).send({
            error_Fullname: 'Invalid Fullname supplied'
          })
          break
        case 'password':
          res.status(400).send({
            error_Password: 'Invalid Password supplied'
          })
          break
        case 'homeAddress':
          res.status(400).send({
            error_Address: 'Invalid Home Address supplied'
          })
          break
        case 'gender':
          res.status(400).send({
            error_Gender: 'Invalid Gender supplied'
          })
          break
        case 'contactNo':
          res.status(400).send({
            error_Contact: 'Invalid Contact Number supplied'
          })
          break
        case 'ageGroup':
          res.status(400).send({
            error_Gender: 'Invalid Age Group supplied'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Supplied'
          })
      }
    }else{
      next()
    }
  },
  registerDoctor (req, res, next){
    const schema = {
      email: Joi.string().email(),
      fullName: Joi.string(),
      password: Joi.string(),
      homeAddress: Joi.string(),
      gender: Joi.string(),
      contactNo: Joi.string(),
      specialization: Joi.string(),
      inHospital: Joi.boolean(),
    }
    const {error, value} = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){   
        case 'email':
          res.status(400).send({
            error_Email: 'Invalid Email Address supplied'
          })
          break
        case 'fullName':
          res.status(400).send({
            error_Fullname: 'Invalid Fullname supplied'
          })
          break
        case 'password':
          res.status(400).send({
            error_Password: 'Invalid Password supplied'
          })
          break
        case 'homeAddress':
          res.status(400).send({
            error_Address: 'Invalid Home Address supplied'
          })
          break
        case 'gender':
          res.status(400).send({
            error_Gender: 'Invalid Gender supplied'
          })
          break
        case 'contactNo':
          res.status(400).send({
            error_Contact: 'Invalid Contact Number supplied'
          })
          break
        case 'specialization':
          res.status(400).send({
            error_Gender: 'Invalid Specialization supplied'
          })
          break
        case 'inHospital':
          res.status(400).send({
            error_Gender: 'Invalid On Premesis supplied'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid Registration Supplied'
          })
      }
    }else{
      next()
    }
  }  
}