const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
router.get('/profile',userAuth, async (req, res) => {
    res.send(req.user.firstName+" profile fetched successfully");
})

module.exports = router;