require('dotenv').config()

module.exports = {
    mongoUri: process.env.MONGODB_URI,
    serverPort: process.env.PORT,
    JWTSecret: process.env.JWT_SECRET,
    emailKeyPublic: process.env.EMAIL_APIKEY_PUBLIC,
    emailKeyPrivate: process.env.EMAIL_APIKEY_PRIVATE,
    apiKeyTmdb: process.env.APY_KEY_TMDB
}
