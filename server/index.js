require('./db/db');
const config = require('./utils/env')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const router = require('./route/route');
const jwt = require('jsonwebtoken');
const utils = require('./utils/commons')
const codeStatus = require('./utils/status')

const PORT = config.serverPort

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload(1))

app.use(function (req, res, next) {

    let token = req.headers['authorization']
    console.log("[SERVER] Token " + token)
    if (!token) return next();

    token = token.replace('Bearer ', '');

    jwt.verify(token, config.JWTSecret, function (err, decode) {
        if (err) {
            console.log("Expired")
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Authentication expired! Please sign in.')
        } else {
            req.auth = decode;
            next();
        }
    });
});

// Routing
app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
