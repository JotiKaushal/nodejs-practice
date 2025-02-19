const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const e = require('express');
const validateUserData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is required');
    }
    else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error('First name should be in 4 to 50 characters range');
    }
    else if (lastName.length < 4 || lastName.length > 50) {
        throw new Error('First name should be in 4 to 50 characters range');
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error('email id is not valid');
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error('password is not strong');
    }
}

const validateProfileData = (req) => {
    const allowedEditFIelds = [
        "lastName", "firstName", "gender","age", "photoUrl", "about", "skills"
    ];

   const isEditAllowed =  Object.keys(req.body).every(field=> allowedEditFIelds.includes(field));
           
   return isEditAllowed;
}


const validateLogin = async (emailId, password) => {
    if (!validator.isEmail(emailId)) {
        throw new Error('Invalid credentials');
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

}


module.exports = { validateUserData, validateLogin, validateProfileData };