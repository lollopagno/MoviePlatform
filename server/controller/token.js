const JWT_SECRET = require('../utils/env').JWTSecret
const jwt = require('jsonwebtoken');
const UserSchema = require('../model/user')
const EmailSchema = require('../model/tokenEmail')
const utils = require('../utils/commons')
const codeStatus = require('../utils/status')
const email = require('./email')
const crypto = require('crypto')

/**
 * Check token email (post)
 */
checkTokenEmail = (req, res) => {

    const token = req.body.token
    const username = req.body.username
    if (!username || !token) utils.requestJsonFailed(res, codeStatus.badRequest, 'Must pass token and username')
    else {
        EmailSchema.findOne({token: token}, function (err, token) {
            if (!token) utils.requestJsonFailed(res, codeStatus.badRequest, 'We were unable to find a valid token. Your token my have expired.')
            else {
                UserSchema.findOne({_id: token._userId, username: username}, function (err, user) {
                    if (!user) utils.requestJsonFailed(res, codeStatus.badRequest, 'We were unable to find a user for this token.')
                    else if (user.isVerified) utils.requestJsonFailed(res, codeStatus.badRequest, 'This user has already been verified.')
                    else {
                        // Verify and save the user
                        user.isVerified = true;
                        user.save(function (err) {
                            if (err) utils.requestJsonFailed(res, codeStatus.serverError, err.message)
                            else utils.requestJsonSuccess(res, codeStatus.OK, 'The account has been verified. Please sign in', utils.getCleanUser(user), '')
                        })
                    }
                })
            }
        })
    }
}

/**
 * Resend token email (post)
 */
resendTokenEmail = (req, res) => {
    const body = req.body
    if (!body) utils.requestJsonFailed(res, codeStatus.badRequest, 'Must pass username or email address')
    else {
        UserSchema.findOne({$or: [{'email': body.username.trim()}, {'username': body.username.trim()}]}, function (err, user) {
            if (!user) utils.requestJsonFailed(res, codeStatus.badRequest, 'We were unable to find a user with the specified email address.')
            else {

                // Delete old token (if present)
                EmailSchema.findOne({_userId: user._id}, function (err, token) {
                    if (err) { /*pass*/
                    } else {
                        token.remove()
                    }
                })

                // Create new token email
                const tokenEmail = new EmailSchema({
                    _userId: user._id,
                    token: crypto.randomBytes(16).toString('hex')
                });

                // Save the token
                tokenEmail.save(function (err) {
                    if (err) utils.requestJsonFailed(res, codeStatus.serverError, err.message)
                })

                // Send email
                email.sendEmail(user.email, user.name, tokenEmail.token).then(() => {
                    console.log("[SERVER] Resend email.")
                    utils.requestJsonSuccess(res, codeStatus.OK, 'A verification email has been resent to ' + user.email + '.', utils.getCleanUser(user), tokenEmail.token)
                })
            }
        })
    }
}

/**
 * Check current token authentication (post)
 */
checkToken = (req, res) => {

    const token = req.headers['authorization'];
    console.log("[TOKEN CHECK TOKEN] "+token)
    if (!token) utils.requestJsonFailed(res, codeStatus.badRequest, 'Must pass token')
    else {

        // Check token that was passed by decoding token using secret
        jwt.verify(token, JWT_SECRET, function (err, decode) {
            if (err) utils.requestJsonFailed(res, codeStatus.badRequest, 'Verify token failed!')
            else {

                // Return user using the id from JWTToken
                UserSchema.findById({'_id': decode._id}, function (err, user) {
                    if (err) utils.requestJsonFailed(res, codeStatus.badRequest, 'User not found to check token!')
                    else {

                        const token = utils.generateToken(user);
                        console.log("[New token created (CheckToken)] "+token)
                        console.log("[SERVER] Check token user.")
                        utils.requestJsonSuccess(res, codeStatus.OK, 'Check user completed!', utils.getCleanUser(user), token)
                    }
                });
            }
        });
    }
}

module.exports = {
    checkTokenEmail, resendTokenEmail, checkToken
}
