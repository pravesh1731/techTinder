const express = require("express");
const requestRouter = express.Router();
const { Auth } = require("../middlewares/auth.js");

requestRouter.post("/connectionRequetSend", Auth, async (req, res) => {
  try {
    const user = req.user;
    res.send("Connection request sent successfully by " + user.firstName+" " +user.lastName);
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

module.exports = requestRouter;