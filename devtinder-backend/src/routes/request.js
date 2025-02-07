const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../Models/connectionRequest");
router.post('/request/send/:status/:userid', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userid;
        const status = req.params.status;
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            res.json({ "message": "invalid status type", "status": status })
        }

        //check for existing connection requests
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [{ fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
            ], fromUserId, toUserId
        });

        if (existingConnectionRequest) {
            res.status(401).send("request already exist")
        }
        const connectionRequest = new ConnectionRequest({

            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({ "message": "sent successfully", "data": data })
    }
    catch (err) { res.status(401).send("error occured " + err.message); }
})


module.exports = router;