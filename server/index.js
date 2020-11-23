require('./db/db');
const config = require('./utils/env')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route/route');
const jwt = require('jsonwebtoken');
const utils = require('./utils/commons')
const codeStatus = require('./utils/status')

const PORT = config.serverPort

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

app.use(function (req, res, next) {

    let token = req.headers['authorization'];
    if (!token) return next();

    token = token.replace('Bearer ', '');
    console.log("[TOKEN AUTHENTICATION]: "+token)

    jwt.verify(token, config.JWTSecret, function (err, user) {
        if (err) {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Please register Sign in using a valid username to submit posts')
        } else {
            req.user = user;
            next();
        }
    });
});

// Routing
app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
