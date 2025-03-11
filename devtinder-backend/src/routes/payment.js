const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorPayInstance = require("../utils/razorpay")
const Payment = require("../Models/payment");
const { membershipAmount } = require("../utils/contants");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const User = require("../Models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const user = req.user;
    const order = await razorPayInstance.orders.create({
      "amount": membershipAmount[membershipType] * 100, //50000 paisa lowest currency
      "currency": "INR",
      "receipt": "receipt#1",
      "notes": {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "emailId": user.emailId,
        "membershipType": membershipType
      }
    });

    //save it to db
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      receipt: order.receipt,
      notes: order.notes
    });

    const savedPayment = await payment.save();

    //return saved Payment detail to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });

  } catch (err) {
    return res.status(500).json({ msg: err.message })

  }

})

//add this in razorpay webhook url
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET)
    if (!isWebhookValid) {
      return res.status(500).json({ msg: "webhook signature is not valid" })
    }
     
    const paymentDetail = req.body.payload.payment.entity;
     //update payment status in DB
     const payment = await Payment.findOne({orderId: paymentDetail.order_id});
     payment.status = paymentDetail.status;
     await payment.save();
      //update user as premium
     const user = await User.findOne({_id:payment.userId});
     user.isPremium = true;
     user.memebershipType = payment.notes.membershipType;
     await user.save();
    if(req.body.event == "payment-captured"){
     //do if anything required
    }

    if(req.body.event == "payment-failed"){
  //do if anything required
    }
  //return success response to razorpay
  return res.status(200).json({ msg: "webhook received successfully" })
  }
  catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})
module.exports = paymentRouter;