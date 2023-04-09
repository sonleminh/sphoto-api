const User = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let userExisted = await User.findOne({ username });
    if (userExisted) {
      return res.status(400).json({ message: 'This username already exists' });
    }
    emailExisted = await User.findOne({ email });
    if (emailExisted) {
      return res.status(400).json({ message: 'This email already exists' });
    }
    const newUser = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      verified: false,
      postList: [],
    });

    await newUser.save();
    res.status(200).json({
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err) throw err;
    if (!user) res.json({ message: 'Username or password is incorrect' });

    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
};

const loginByGoogle = async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await User.findOne({
      username,
    });
    let newUser;
    if (!user) {
      newUser = new User({
        username,
        email,
        password: await bcrypt.hash('', 10),
        verified: false,
        postList: [],
      });
      await newUser.save();
      res.status(200).json({
        user: newUser,
      });
    } else {
      return res.status(200).json({
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  loginByGoogle,
};
