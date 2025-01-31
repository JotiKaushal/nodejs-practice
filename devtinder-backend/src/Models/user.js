const mongoose = require('mongoose')
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email address is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photourl is not valid");
            }
        }
    },
    about: {
        type: String,
        default: 'this is the default value of about'
    },
    skills: {
        type: [String],
        validate(value) {
            if (value?.length > 10) {
                throw new Error("Only 10 skills are allowed");
            }
        }
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
module.exports = User;