const express = require("express");
const router = express.Router();
const fetch = require("../middleware/FetchDetails");
var jwt = require("jsonwebtoken");
const jwtSecret = "NezukoChanTanjiro@1234567890@Inosuke";
const User = require("../models/User");

router.post("/clothData", (req, res) => {
  try {
    res.send([global.cloth_items, global.cloth_category]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

router.post("/getuser", fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // -password will not pick password from db.
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
