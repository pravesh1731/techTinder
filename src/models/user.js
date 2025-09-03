const mongoose = require("mongoose");

//creating schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },

})


// creating model
const User = mongoose.model("User", userSchema);

module.exports = User;