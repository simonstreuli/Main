const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
    try {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPasword = await bcrypt.hash(req.body.password, salt);
  
      // create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPasword,
      });
  
      // save the new user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json("Error: " + err);
    }
  });