const express = require("express");
const app = express();


app.use("/home",(req, res) => {
res.send("this ia the home page");
}); 
app.get("/user",(req, res) => {
res.send({ first_name : "Pravesh", last_name : "Chaudhary"});
});
app.post("/user",(req, res) => {
res.send("Data save Successfully to the Database");
});
app.delete("/user",(req, res) => {
res.send("Data delete Successfully from the Database");
});
app.use("/profile",(req, res) => {
res.send("welcome this is your profile");
});
app.use("/menu",(req, res) => {
res.send("MENU MENU is comming soon....");
});
app.use("/ab/2",(req, res) => {
res.send("ab ab.");
});
app.use("/ab",(req, res) => {
res.send("ab ab ab ab.");
});



app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
})
