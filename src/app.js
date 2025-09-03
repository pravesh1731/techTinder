const express = require("express");
const app = express();

//order matter alot
//app.use("/user", rH1, rH2, [rH3, rH4], rH5)
const {adminAuth, userAuth} = require("./middlewares/auth.js");

app.use("/admin", adminAuth);   //this is a middleware

app.get("/admin/getAllData", (req, res) =>{
    res.send("All Data send")
})

// ish trha call kre middleware ko agr 1 he request handle ho.
app.get("/user",userAuth, (req, res) =>{
    res.send("Hello I am user")
})


app.use("/", (err, req, res, next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})




app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
})
