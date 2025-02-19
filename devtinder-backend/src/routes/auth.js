const express = require("express")
const { validateUserData, validateLogin } = require('../utils/validation');
const bcrypt = require("bcrypt");
const User = require('../Models/user');
const router = express.Router();

router.post('/login', async (req, res) => {

    try {
        const { emailId, password } = req.body;
        await validateLogin(emailId, password);
        const user = await User.findOne({ emailId: emailId });
        //reate jwttoken
        const token = await user.getJWT();
        //add token to cookie & send response back to user
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
        res.json({"message": "login successfully", user: user});
    } catch (err) {
        res.status(401).json({"message":"ERROR: " + err.message});
    }
})


router.post('/logout',  (req, res) => {
    try {
        res.cookie('token', null, { expires: new Date(Date.now()) });
        res.json({"message":"logout successfully"});
     }
    catch (error) { res.status(401).json({"message":"ERROR: " + err.message}); }
})

router.post('/signup', async (req, res) => {
    // const user = new User({
    //     firstName: 'Atharv',
    //     lastName: 'Rana',
    //     emailId: 'atharv@gmail.com',
    //     password: '12345',
    //     gender: 'Male'
    // });
    try {

        //validate data
        validateUserData(req);
        const { firstName, lastName, emailId, password, gender } = req.body;
        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
        //create user
        const user = new User({ firstName, lastName, emailId, password: passwordHash, gender });
        const exitingUser = await User.findOne({ emailId: user.emailId });
        if (exitingUser && exitingUser.length > 0) {
            res.status(401).json({"message":"email already exist"});
        } else {
           const savedUser = await user.save();
            //reate jwttoken
         const token = await savedUser.getJWT();
        //add token to cookie & send response back to user
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.json({"message":"user added successfully", data: savedUser});
        }

    } catch (err) {
        res.status(401).json({"message":"ERROR: " + err.message});
    }
})


module.exports = router;