const express = require("express");
const connectDB= require("./config/database.js");
const User= require("./models/user.js");
const app = express();


app.post("/signup",async(req, res)=>{
  const obj ={
    firstName:"virat",
    lastName:"Chaudhary",
    email:"pravesh@example.com",
    password:"password123",
    age:25,
    gender:"Male"
  }
  const user = new User(obj);

   
  try{
  await user.save()
  res.send("User signed up successfully");
  }catch(err){
    res.status(500).send("Error signing up user");
}
  
});




connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
     });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


