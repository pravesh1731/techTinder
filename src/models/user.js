const mongoose = require("mongoose");
const validator = require("validator");

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
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }


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
    skills:{
        type:[String],
        validate(value){
            if(value.length > 10){
                throw new Error("Skills are more than 10")
            }
        }
    }

},
{
    timestamps:true
})


// creating model
const User = mongoose.model("User", userSchema);

module.exports = User;