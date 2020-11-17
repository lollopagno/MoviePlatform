require('dotenv').config()

module.exports = {
    mongoUri: process.env.MONGODB_URI,
    serverPort: process.env.PORT,
    JWTSecret: process.env.JWT_SECRET,
}
