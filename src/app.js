const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);
  //   const obj ={
  //     firstName:"virat",
  //     lastName:"Chaudhary",
  //     email:"pravesh@example.com",
  //     password:"password123",
  //     age:25,
  //     gender:"Male"
  //   }
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user");
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// get all the users
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

//Delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Update the user data
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "age",
      "skills"
    ];
    const isUpdateAllowed = Object.keys(data);
    const isValidOperation = isUpdateAllowed.every((update) =>
      ALLOWED_UPDATES.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send("Update is not allowed!");
    } 
    
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    res.status(404).send("UPDATE FAILED:" + err.message);
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
