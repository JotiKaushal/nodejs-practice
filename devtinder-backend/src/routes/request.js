const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../Models/connectionRequest");
const User = require("../Models/user");
router.post('/request/send/:status/:userid', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userid;
        const status = req.params.status;
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            res.json({ "message": "invalid status type", "status": status }).send();
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            res.json({ "message": "user not found"}).send();
        }

        //check for existing connection requests
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [{ fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
            ]});

        if (existingConnectionRequest) {
            res.json({ "message": "request already exist"}).send();
        }
        const connectionRequest = new ConnectionRequest({

            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({ "message": `${req.user.firstName} ${status} in ${toUser.firstName}` , "data": data }).send();
    }
    catch (err) { res.status(401).send("error occured " + err.message); }
})


module.exports = router;