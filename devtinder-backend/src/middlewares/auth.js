const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userAuth = async (req, res, next) =>{
try{
    //read token req cookie validate it and find user
const {token} = req.cookies;
if(!token){
   return res.status(401).send("Please login!");
}
const decodedObj = await jwt.verify(token, "dev@tinder#76");
const {_id} = decodedObj;
const user = await User.findById(_id);
if(!user){
    throw new Error("User not found");
}
req.user = user;
next();
}
catch(error){
    res.status(400).send("some error occurred " + error.message);
}
}
const adminAuth = () =>{

}

module.exports = {
    userAuth,
    adminAuth
}