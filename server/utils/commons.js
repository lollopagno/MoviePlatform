const JWT_SECRET = require('../utils/env').JWTSecret
const jwt = require('jsonwebtoken');

module.exports = {
    requestJsonFailed: function (res, statusCode, message) {
        return res.status(statusCode).json({
            success: false,
            message: message,
        })
    },

    requestJsonSuccess: function (res, statusCode, message, user, token) {
        return res.status(statusCode).json({
            success: true,
            message: message,
            user: user,
            token: token
        })
    },

    /**
     * Generate token to authentication
     * @param user contain data for TOKEN
     * @returns {undefined|*} json TOKEN
     */
    generateToken: function (user) {
        const tokenData = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            admin: user.admin
        };
        return jwt.sign(tokenData, JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "60m", /* minutes */
        });
    },

    getCleanUser: function (user) {
        if (!user) {
            return {};
        }

        const userClean = user.toJSON();

        return {
            _id: userClean._id,
            name: userClean.name,
            email: userClean.email,
            username: userClean.username,
            //admin: userClean.admin,
            //createdAt: userClean.createdAt,
            //updatedAt: userClean.updatedAt
        }
    }
}
