const mongoose = require('mongoose');
//const { isEmail, isMobilePhone } = require('validator');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    //validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  name: {
    type: String
  },
  userType: {
    type: String,
    lowercase: true
  },
  address: {
    type: Array
  }
});




const User = mongoose.model('user', userSchema);

module.exports = User