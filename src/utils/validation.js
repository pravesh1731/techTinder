const validator = require("validator");

const validateSignupData = (req) => {
 
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  
  }else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } 
  else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};


const validateEditProfileData = (req) => {
  const allowedEditFeilds =["firstName", "lastName", "age", "email","about","skills"]
  const isEditAllowed = Object.keys(req.body).every((feild) => allowedEditFeilds.includes(feild)
);
return isEditAllowed;
}

module.exports = { validateSignupData, validateEditProfileData };
