const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require('../utils/validation');
router.get('/profile/view', userAuth, async (req, res) => {
    res.json({"message": "success", user: req.user});
})

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileData(req)) {
            throw new Error("Invalid edit request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        });
        await loggedInUser.save();
        res.json({
            "message": `${loggedInUser.firstName} your profile updated successfully`,
            user: loggedInUser
        }).send();
    }
    catch (err) { res.status(401).json({"message":"error occured " + err.message}); }
})
module.exports = router;