const express = require('express');
const passport = require('passport');
const router = express.Router();
const initPassportLocal = require('../controllers/auth/passportLocal');
const {
  register,
  login,
  loginByGoogle,
} = require('../controllers/auth.controller');

initPassportLocal();

router.post('/signup', register);

router.post('/login', login);

router.post('/login-google', loginByGoogle);

module.exports = router;
