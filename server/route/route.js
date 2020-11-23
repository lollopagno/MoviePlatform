const express = require('express');
const User = require('../controller/user');
const Token = require('../controller/token');
const Email = require('../controller/email');
const router = express.Router();

// Api get
router.get('/sameUsername', (req, res) => User.sameUsername(req,res));
router.get('/validationEmail', (req, res) => Email.validationEmail(req,res));

// Api post
router.post('/signIn', (req, res) => User.signIn(req,res));
router.post('/newUser', (req, res) => User.signUp(req,res));
router.post('/confirmation', (req, res) => Token.checkTokenEmail(req, res));
router.post('/resendToken', (req, res) => Token.resendTokenEmail(req, res));
router.post('/checkToken', (req, res) => Token.checkToken(req, res));

module.exports = router;
