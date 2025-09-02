const express = require("express");
const app = express();

//order matter alot
//app.use("/user", rH1, rH2, [rH3, rH4], rH5)

app.get("/user", (req, res, next)=>{
    console.log("Response 1");
    // res.send("User response 1");
    next();
},
(req, res, next)=>{
    console.log("Response 2");
    res.send("User response 2");
},
(req, res, next)=>{
    console.log("Response 3");
    res.send("User response 3");
},
(req, res, next)=>{
    console.log("Response 4");
    res.send("User response 4");
},
(req, res, next)=>{
    console.log("Response 5");
    res.send("User response 5");
},
)


app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
})
