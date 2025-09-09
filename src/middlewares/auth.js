//this is a auth middelware
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const Auth = async(req, res, next) => {
  try{
    const token = req.cookies.token;
    if(!token){
    throw new Error("Invalid token");
  }
  const decodedObj = await jwt.verify(token, "Pravesh@2004janu#");
  const {userId} = decodedObj;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  } else {
    req.user = user; //req kai saath attch kr deya
    next();
  }}catch(err){
    res.status(401).send("User is not authorized " + err.message);
  }
};

module.exports = { Auth };
