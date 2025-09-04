const mongoose = require("mongoose");

//creating schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
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
        type:Number,
        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value.toLowerCase())){
                throw new Error("Gender is not a valid")
            }
        } 
    },
    about:{
        type:String,
        default:"this is deafult thing about the user."
    },

},
{
    timestamps:true
})


// creating model
const User = mongoose.model("User", userSchema);

module.exports = User;