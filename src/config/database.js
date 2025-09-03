// myaYm0V3OjCbk3xM
// mongodb+srv://pravesh1731:myaYm0V3OjCbk3xM@pravesh.dvkuchg.mongodb.net/
// mongodb+srv://pravesh1731:YHYLlZdIthOsYU84@pravesh.dpxvlse.mongodb.net/?retryWrites=true&w=majority

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pravesh1731:myaYm0V3OjCbk3xM@pravesh.dvkuchg.mongodb.net/techTinder"
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
