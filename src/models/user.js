const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.getJWT = async function() {
    const user = this;
     const token = jwt.sign({ userId: user._id }, "Pravesh@2004janu#", {
        expiresIn: "5 hours",
      });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHashed = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHashed);
    return isPasswordValid;
}


// creating model
const User = mongoose.model("User", userSchema);

module.exports = User;