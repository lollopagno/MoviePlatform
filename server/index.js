require('./db/db');
const config = require('./utils/env')
const app = require('express')();
const server = require('http').Server(app);
const socketServer = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route/route');
const jwt = require('jsonwebtoken');
const utils = require('./utils/commons')
const codeStatus = require('./utils/status')

/**
 * Port connection
 */
const PORT = config.serverPort

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

/**
 * Check token authentication
 */
app.use(function (req, res, next) {

    let token = req.headers['authorization']
    console.log("[SERVER] Token " + token)
    if (!token) return next();

    token = token.replace('Bearer ', '');

    jwt.verify(token, config.JWTSecret, function (err, decode) {
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, 'Session expired! Please sign in.')
        else {
            req.auth = decode;
            next();
        }
    });
});

/**
 * Routing
 */
app.use('/api', router);

/**
 * Socket server
 */
const io = socketServer(server)

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected!`);

    // Broadcast messages
    socket.on('new content added', data => {
        console.log('broadcast.....')
        socket.broadcast.emit('notice new content added', data)
    })

    // User disconnected
    socket.on('disconnect', () => {
        console.log('Disconnected - ' + socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
