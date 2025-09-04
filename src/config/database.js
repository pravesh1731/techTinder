// 8vS29mMKw6ZfcDMW
// mongodb+srv://pravesh4531_db_user:8vS29mMKw6ZfcDMW@pravesh.ciwypkh.mongodb.net/
// mongodb+srv://pravesh1731:YHYLlZdIthOsYU84@pravesh.dpxvlse.mongodb.net/?retryWrites=true&w=majority

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pravesh4531_db_user:8vS29mMKw6ZfcDMW@pravesh.ciwypkh.mongodb.net/techTinder"
  );
};

// connectDB()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((err) => {
//     console.error("Database connection error:", err);
//   });

  module.exports = connectDB;
