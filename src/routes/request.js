const express = require("express");
const requestRouter = express.Router();
const { Auth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequestModel.js");
const User = require("../models/user.js"); 

requestRouter.post("/request/send/:status/:userId", Auth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status value");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("User not found");
    }

    if (fromUserId.toString() === toUserId) {
      throw new Error("You cannot send a connection request to yourself");
    }

    // Check if a connection request already exists between the two users
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });
    if(existingRequest){
      throw new Error("A connection request already exists between these users");
    }

    if (existingRequest) {
      throw new Error("A connection request already exists between these users");
    }

    // Create a new connection request

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();
    res.json({
      message: "Connection request sent successfully",
      data
    }); 
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

requestRouter.post("/request/review/:status/:requestId", Auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const {status , requestId} = req.params;


    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({message:"Status is not allowed"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    });

    if (!connectionRequest) {
      return res.status(404).json({message:"Connection request not found"});
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();



    res.json({
      message: `Connection request ${status} successfully`,
      data
    });
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

module.exports = requestRouter;