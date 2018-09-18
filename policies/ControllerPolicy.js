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
  } 
}