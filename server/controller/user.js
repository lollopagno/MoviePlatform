const utils = require('../utils/commons')
const UserSchema = require('../model/user')
const EmailSchema = require('../model/tokenEmail')
const RatingSchema = require('../model/rating')
const codeStatus = require('../utils/status')
const email = require('./email')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

/**
 * Authentication sign in (post)
 */
signIn = (req, res) => {
    const body = req.body
    if (!body) {
        utils.requestJsonFailed(res, codeStatus.unauthorized, 'You must provide a credentials!')
    } else {
        UserSchema.findOne({$or: [{'email': body.username.trim()}, {'username': body.username.trim()}]}, function (err, user) {
            // SingIn error
            if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.messages)
            // Email or username are wrong
            else if (!user) utils.requestJsonFailed(res, codeStatus.notFound, 'The email address or username is not associated with any account.')
            else {
                bcrypt.compare(body.password.trim(), user.password, function (err, valid) {
                    if (!valid) utils.requestJsonFailed(res, codeStatus.notFound, 'Username or password is invalid!')
                    else {
                        // Check if the user has been verified email
                        if (!user.isVerified) utils.requestJsonFailed(res, codeStatus.unauthorized, 'Your account has not been verified.')
                        else {
                            // SignIn successful, generate token
                            const token = utils.generateToken(user);
                            console.log("[New token created (signIn)] "+token)
                            console.log("[SERVER] Authentication user completed!")
                            utils.requestJsonSuccess(res, codeStatus.created, 'Sign in completed!', utils.getCleanUser(user), token)
                        }
                    }
                });
            }
        });
    }
}
/**
 * Check if exists the same username or same email (get)
 */
sameField = (req, res) => {
    UserSchema.findOne({[req.query.field]: req.query.data.trim()}, function (err, user) {
        if (err) utils.requestJsonFailed(res, codeStatus.badRequest, 'Search failed!')
        else {
            if (!user) utils.requestJsonSuccess(res, codeStatus.OK, 'There is no user!', [])
            else utils.requestJsonSuccess(res, codeStatus.OK, 'There is the user!', user)
        }
    })
}

/**
 * Create sign up (post)
 */
signUp = (req, res) => {
    const body = req.body
    // SignUp error
    if (!body) utils.requestJsonFailed(res, codeStatus.paymentRequired, 'You must provide a parameters to create new user!')
    else {

        // Generated salt
        bcrypt.genSalt(10, function (err, salt) {
            if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            else {
                // Encode password
                let hash = bcrypt.hashSync(body.password.trim(), salt);
                const newUser = new UserSchema({
                    name: body.name.trim(),
                    email: body.email.trim(),
                    username: body.username.trim(),
                    password: hash,
                })

                hash = undefined;

                newUser.save(function (err, user) {
                    // Saved new user failed
                    if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                    else {
                        console.log("[SERVER] User created!")

                        // Create token email document
                        const tokenEmail = new EmailSchema({
                            _userId: user._id,
                            token: crypto.randomBytes(16).toString('hex')
                        })

                        tokenEmail.save(function (err) {
                            if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                        })

                        // Create rating document
                        const rating = new RatingSchema({
                            _userId: user._id,
                            content: []
                        })

                        rating.save(function (err) {
                            if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                        })

                        console.log("[SERVER] Token email created!")
                        // Send email
                        email.sendEmail(user.email, user.name, tokenEmail.token).then(() => {
                            console.log("[SERVER] Verification email has been sent!")
                            utils.requestJsonSuccess(res, codeStatus.OK, 'A verification email has been sent to ' + user.email + '.', utils.getCleanUser(user), tokenEmail.token)
                        })
                    }
                })
            }
        })
    }
}

module.exports = {
    signIn, signUp, sameField
}
