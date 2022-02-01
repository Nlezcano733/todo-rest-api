const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { ErrorHandler } = require("../utils/ErrorHandler");
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
    ErrorHandler(res, e)
  }
};

const editProfile = async (req, res) => {
  const userId = req.headers["uid"];
  try {
    const user = await User.findById({ _id: userId });
    if (!user) return res.status(404).json({ message: "No user found" });

    const newProfile = await User.replaceOne({ _id: userId }, req.body);
    res.status(200).json(newProfile);
  } catch (e) {
    ErrorHandler(res, e)
  }
}

const deleteProfile = async (req, res) => {
  try {
    const user = req.headers["uid"];
    await User.deleteOne({ _id: user });

    logout();
  } catch (e) {
    ErrorHandler(res, e)
  }
}

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
    ErrorHandler(res, e)
  }
};

const logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

module.exports = {
  signUpController,
  signInController,
  getProfile,
  editProfile,
  deleteProfile,
  logout,
};
