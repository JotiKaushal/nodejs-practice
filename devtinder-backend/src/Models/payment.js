const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    currency: {
        type: String,
        require: true
    },
    receipt: {
        type: String,
        require: true
    },
    notes: {
       firstName: {type: String},
       lastName: {type: String},
       emailId: {type: String},
       membershipType: {type: String},
    },
}, {timestamps: true})


module.exports = new mongoose.model("payment", paymentSchema)