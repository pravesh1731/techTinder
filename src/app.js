const express = require("express");
const app = express();

//order matter alot
//app.use("/user", rH1, rH2, [rH3, rH4], rH5)
const {adminAuth, userAuth} = require("./middlewares/auth.js");

app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, res) =>{
    res.send("All Data send")
})

// ish trha call kre middleware ko agr i he request handle ho.
app.get("/user",userAuth, (req, res) =>{
    res.send("Hello I am user")
})




app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
})
