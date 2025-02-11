const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    status: {
        type: String,
        enum: {
            values:["ignore", "interested","rejected","accepted"],
            message: "{VALUE} is not supported"
        },
        require: true
    }
},{timestamps: true});
//connectionRequest.find({fromUserId: "dfdfdfdf", toUserId: dfdfdf""}) <== it is compount index, below will make this query fast
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});
connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;
    //check if from and to id are same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("From and To user cannot be same");
    }
    next();
})
const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequest;