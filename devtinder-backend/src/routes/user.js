const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequests = require("../Models/connectionRequest");
const userRoute = express.Router();

//get all the pending connection requests for logged in user
userRoute.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log(loggedInUser);
        
        const connectionRequests = await ConnectionRequests.find({ toUserId: loggedInUser._id, status: "interested" }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "skills", "photoUrl"]);
        //populate("fromUserId", "firstName lastName"); can be written in string also
        console.log(connectionRequests);
        
        if (connectionRequests.length === 0) { return res.json({ message: "No connection request" }) }
        res.json({ message: "success", data: connectionRequests })
    }
    catch (err) { res.status(401).send(err.message) }

})

userRoute.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequests.find({
            $or: [{ fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "skills", "photoUrl"]).populate("toUserId", ["firstName", "lastName", "age", "gender", "skills", "photoUrl"]);
        if (connectionRequests.length === 0) { return res.json({ message: "No connection request" }) }
        res.json({ message: "success", data: connectionRequests.map(data =>{
            if(data.fromUserId.equals(loggedInUser._id)){
               return data.toUserId
            }
            return data.fromUserId}) }); // it will just give info about fom user id
    }
    catch (err) { res.status(401).send(err.message) }
})

module.exports = userRoute;