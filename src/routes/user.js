const express = require("express");
const userRouter = express.Router();
const { Auth } = require("../middlewares/auth.js");
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequestModel.js");

userRouter.get("/user/requests/received", Auth, async (req, res) => {
  try {
   const loggedInUser = req.user;

   const receivedRequests = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "interested"
   }).populate("fromUserId", ["firstName", "lastName", "email"]);

   if (receivedRequests.length === 0) {
    return res.send("No pending connection requests found");
   }
   res.json({
    message: "Connection requests retrieved successfully",
    receivedRequests
});
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

userRouter.get("/user/connections", Auth, async (req, res) => {
    try{
      const loggedInUser = req.user;
      const connections = await ConnectionRequest.find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" } 
        ]
      }).populate("fromUserId", ["firstName", "lastName", "email"])
        .populate("toUserId", ["firstName", "lastName", "email"]);
    
      //now only want to show the other person's details in the connection
        const data  = connections.map((row)=>row.fromUserId);
  
      if (connections.length === 0) {
        return res.send("No connections found");
      }
  
      res.json({
        message: "Connections retrieved successfully",
        data 
      });

    }catch(err){
        res.status(400).send("ERROR " + err.message);
    }
});

userRouter.get("/user/feed", Auth, async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch users excluding the logged-in user and those with existing connection requests
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId status");

        const excludedUserIds = new Set();
        connectionRequest.forEach(element => {
            excludedUserIds.add(element.fromUserId.toString());
            excludedUserIds.add(element.toUserId.toString());
        });

        const feedUsers = await User.find({
            $and : 
            [ 
                {_id: {$nin: Array.from(excludedUserIds)}},
                {_id: {$ne: loggedInUser._id}}

            ]
        }).select("firstName lastName")
        .skip(skip)
        .limit(limit);

        res.json({
            message: "Feed users retrieved successfully",
            feedUsers
        });
        // Get the logged-in user's ID
        // user ko uska id na dikhe
        //user ko interested or ignored request bhejne ke baad wo user uske feed me na dikhe
        //user ko wo user na dikhe jinke sath uska connection accepted ho chuka hai

    }catch(err){
        res.status(500).send("ERROR " + err.message);
    }
});


module.exports = userRouter;