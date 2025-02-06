const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
router.post('/sendConnectionRequest', userAuth, async (req, res) => {
    res.send(req.user.firstName + "sent connection request");
})


module.exports = router;