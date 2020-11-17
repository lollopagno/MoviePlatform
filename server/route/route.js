const express = require('express');
//const User = require('../controller/user/userController');
const router = express.Router();

// Api get
//router.get('/sameUsername', (req, res) => User.sameUsername(req,res));
//router.get('/checkToken', (req, res) => User.checkToken(req, res));

// Api post
router.post('/signIn', (req, res) => User.signIn(req,res));
//router.post('/newUser', (req, res) => User.signUp(req,res));

module.exports = router;
