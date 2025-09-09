const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

//signup
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate user data 
    validateSignupData(req);
    console.log(req.body);
    // Encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

//login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
       return res.status(404).send("Email id is not found");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create JWT token
      const token = await user.getJWT();
      console.log(token);
      //Add the token to the cookies and send back to the user
      res.cookie("token", token);
      res.send("User logged in successfully");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

//logout api 
authRouter.post("/logout", async(req, res) =>{
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })
        res.send("User logged out successfully");
    }catch(err){
        res.status(500).send("ERROR " + err.message);
    }
});

module.exports = authRouter;