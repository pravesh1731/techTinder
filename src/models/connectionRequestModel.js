const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    
    },
    status:{
        type: String,
        enum: ["ignored","interested", "accepted", "rejected"],
        
    }
},
{
    timestamps:true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = connectionRequestModel;