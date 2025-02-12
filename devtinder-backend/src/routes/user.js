const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequests = require("../Models/connectionRequest");
const User = require("../Models/user");
const userRoute = express.Router();
const USER_DATA = "firstName lastName age gender skills photoUrl";
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
    catch (err) { res.status(401).json({"message":err.message}) }

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
    catch (err) { res.status(401).json({"message":err.message}) }
})


userRoute.get('/feed', userAuth, async (req, res) => {
    try {
        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page -1)*limit;
        const loggedInUser = req.user;
        //except: user should not see his own card, should not see existing connection, should not see ignored connections, already sent connection requests

        //get all the requests (sent or received)
        const connectionRequests = await ConnectionRequests.find({$or:[{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]}).select("fromUserId toUserId");
        const hideUserFromFeed = new Set();
        connectionRequests.forEach(req=> {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
        const users = await User.find({$and:[{_id:{$nin: Array.from(hideUserFromFeed)}}, {_id: {$ne: loggedInUser._id}}]}).select(USER_DATA).skip(skip).limit(limit);
        res.json({"data":users});
    }
    catch (err) { res.status(401).json({"message":err.message}) }
})

module.exports = userRoute;