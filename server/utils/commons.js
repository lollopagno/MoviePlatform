const JWT_SECRET = require('../utils/env').JWTSecret
const jwt = require('jsonwebtoken');

module.exports = {

    HOST: 'api.themoviedb.org',
    IMAGE: 'https://image.tmdb.org/t/p/w500/',

    requestJsonFailed: (res, statusCode, message) => {
        return res.status(statusCode).json({
            success: false,
            message: message,
        })
    },

    requestJsonSuccess: (res, statusCode, message, data, token) => {
        return res.status(statusCode).json({
            success: true,
            message: message,
            data: data,
            token: token
        })
    },

    /**
     * Generate token to authentication
     * @param user contain data for TOKEN
     * @returns {undefined|*} json TOKEN
     */
    generateToken: (user) => {
        const tokenData = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
        };
        return jwt.sign(tokenData, JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "60m", /* minutes */
        });
    },

    getCleanUser: (user) => {
        if (!user) return {};

        const userClean = user.toJSON();

        return {
            _id: userClean._id,
            name: userClean.name,
            email: userClean.email,
            username: userClean.username,
        }
    }
}
