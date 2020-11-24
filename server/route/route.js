const express = require('express');
const User = require('../controller/user');
const Token = require('../controller/token');
const Email = require('../controller/email');
const router = express.Router();

// User
router.get('/user/same_username', (req, res) => User.sameUsername(req,res));
router.post('/user/sign_in', (req, res) => User.signIn(req,res));
router.post('/user/new_user', (req, res) => User.signUp(req,res));

// Email
router.get('/email/validation', (req, res) => Email.validationEmail(req,res));

// Token
router.post('/token/email/confirmation', (req, res) => Token.checkTokenEmail(req, res));
router.post('/token/email/resend', (req, res) => Token.resendTokenEmail(req, res));
router.post('/token/authentication/check', (req, res) => Token.checkToken(req, res));

module.exports = router;
