const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

const signUpController = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const user = new User({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    //encrypt user password and save it
    user.password = await user.encryptPassword(password);
    await user.save();

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 2, // expires in 2 hours
    });

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ message: "Error in sign up user" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ message: "Error in request" });
  }
};

const signInController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Error in request, some data is incorrect" });
    }

    const validPassword = await user.comparePassword(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        auth: false,
        token: null,
      });
    }
    // create a token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 2, // expires in 2 hours
    });

    res.status(200).json({ auth: true, token });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ message: "Error in request" });
  }
};

const logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

module.exports = {
  signUpController,
  signInController,
  getProfile,
  logout,
};

/**
 * Data:
 * email: nlezcano733@gmail.com
 * pass: admin2021
 * username: nlezcano
 * token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjVhODMxZDNhODhhMzBjZmE3ZTc3ZCIsImlhdCI6MTY0MzQ4OTMyOSwiZXhwIjoxNjQzNDk2NTI5fQ.Br3f9zmpo2Rk6qkUYRFTkWWPMCVYe-EqYPTLlb3jL1c
 */
