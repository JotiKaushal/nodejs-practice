const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequests = require("../Models/connectionRequest");
const User = require("../Models/user");
router.post('/request/send/:status/:userid', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userid;
        const status = req.params.status;
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
           return res.json({ "message": "invalid status type", "status": status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
           return res.json({ "message": "user not found" });
        }

        //check for existing connection requests
        const existingConnectionRequest = await ConnectionRequests.findOne({
            $or: [{ fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
          return  res.json({ "message": "request already exist" });
        }
        const connectionRequest = new ConnectionRequests({

            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({ "message": `${req.user.firstName} ${status} in ${toUser.firstName}`, "data": data });
    }
    catch (err) { res.status(401).json({"message":"error occured " + err.message}); }
})

router.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {requestId, status} = req.params;
        
        //validate status in URL

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(401).json({message: "status not allowed"});
        }

        //logged in user should be to user id
        //request id should be valid
        // status of connection request should be interested
        const connectionRequest = await ConnectionRequests.findOne({_id: requestId, toUserId: loggedInUser._id, status: "interested" });

        if(!connectionRequest){
            return res.status(404).json({message: "Connection request not found"});
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({message: `connection request ${status}`, data})
    }
    catch (err) { res.status(401).json({"message":"error occured " + err.message}); }
})


module.exports = router;