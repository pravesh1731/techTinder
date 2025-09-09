const express = require("express");
const profileRouter = express.Router();
const { Auth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//profile
profileRouter.get("/profile/view", Auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

//edit profile
profileRouter.patch("/profile/edit" , Auth, async(req, res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid data for profile edit");
        }
        // const loggedInUserId = req.user._id ;
        // const data = req.body;
        // const upadetvalue = await User.findByIdAndUpdate(loggedInUserId, data,);
        // console.log(upadetvalue);
        
        const loggedInUser = req.user;
        
        const updates = req.body;
        Object.keys(updates).forEach((key) => {
            loggedInUser[key] = updates[key];
        });
        await loggedInUser.save();
        res.send("Profile updated successfully");

    }catch(err){
        res.status(500).send("ERROR " + err.message);
    }
})

//edit password
profileRouter.patch("/profile/password", Auth, async(req, res) =>{
    try{
        const loggedInUser = req.user;
        var oldPassword = loggedInUser.password;
        const newPassword = req.body.password;
        if(!oldPassword || !newPassword){
            throw new Error("Both old and new password are required");
        }
    
    
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(loggedInUser._id, { password: hashedNewPassword } );
        console.log(hashedNewPassword)

        res.send("Password updated successfully");
    }catch(err){
        res.status(500).send("ERROR " + err.message);
    }
})

module.exports = profileRouter;