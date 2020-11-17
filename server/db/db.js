const URI_MONGODB = require('../utils/env').mongoUri
const mongoose = require('mongoose')

mongoose
    .connect(URI_MONGODB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(console.info("Connection Db Accepted"))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
