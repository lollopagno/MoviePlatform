const utils = require('../utils/commons')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const UserSchema = require('../model/user')
const EmailSchema = require('../model/tokenEmail')
const RatingSchema = require('../model/rating')
const newContents = require('../model/newContents')

const codeStatus = require('../utils/status')
const email = require('./email')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

/**
 * Authentication sign in
 */
signIn = (req, res) => {
    const body = req.body
    if (body) return utils.requestJsonFailed(res, codeStatus.unauthorized, 'You must provide a credentials!')

    UserSchema.findOne({$or: [{'email': body.username.trim()}, {'username': body.username.trim()}]}, (err, user) => {

        // SingIn error
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.messages)

        // Email or username are wrong
        if (!user) return utils.requestJsonFailed(res, codeStatus.notFound, 'The email address or username is not associated with any account.')

        bcrypt.compare(body.password.trim(), user.password, (err, valid) => {

            if (!valid) return utils.requestJsonFailed(res, codeStatus.notFound, 'Username or password is invalid!')

            // Check if the user has been verified email
            if (!user.isVerified) return utils.requestJsonFailed(res, codeStatus.unauthorized, 'Your account has not been verified.')

            // SignIn successful, generate token
            const token = utils.generateToken(user);
            console.log("[New token created (signIn)] " + token)
            console.log("[SERVER] Authentication user completed!")
            return utils.requestJsonSuccess(res, codeStatus.created, 'Sign in completed!', utils.getCleanUser(user), token)
        });
    });
}
/**
 * Check if exists the same username or same email
 */
sameField = (req, res) => {
    const query = req.query
    if (query) return utils.requestJsonFailed(res, codeStatus.unauthorized, 'You must provide a parameters!')

    UserSchema.findOne({[query.field]: query.data.trim()}, (err, user) => {
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, 'Search failed!')
        if (!user) return utils.requestJsonSuccess(res, codeStatus.OK, 'There is no user!', [])
        return utils.requestJsonSuccess(res, codeStatus.OK, 'There is the user!', user)
    })
}

sameFieldExceptUser = (req, res) => {

    const param = req.query
    if (param) return utils.requestJsonFailed(res, codeStatus.unauthorized, 'You must provide a parameters!')

    const query = {
        "$match": {
            [param.field]: param.data.trim(),
            _id: {$ne: ObjectId(param.id)}
        }
    }

    UserSchema.aggregate([query], (err, user) => {
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, 'Search failed!')
        if (!user) return utils.requestJsonSuccess(res, codeStatus.OK, 'There is no user!', [])
        return utils.requestJsonSuccess(res, codeStatus.OK, 'There is the user!', user)
    })
}

/**
 * Create sign up
 */
signUp = (req, res) => {

    const body = req.body
    // SignUp error
    if (body) return utils.requestJsonFailed(res, codeStatus.paymentRequired, 'You must provide a parameters to create new user!')

    // Generated salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)

        // Encode password
        let hash = bcrypt.hashSync(body.password.trim(), salt);
        const newUser = new UserSchema({
            name: body.name.trim(),
            email: body.email.trim(),
            username: body.username.trim(),
            password: hash,
        })

        hash = undefined;

        newUser.save((err, user) => {
            // Saved new user failed
            if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)

            console.log("[SERVER] User created!")

            // CREATE token email document
            const tokenEmail = new EmailSchema({
                _userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            })

            tokenEmail.save((err) => {
                if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            })

            // CREATE rating document
            const rating = new RatingSchema({
                _userId: user._id,
                content: []
            })

            rating.save((err) => {
                if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            })

            console.log("[SERVER] Token email created!")
            // Send email
            email.sendEmail(user.email, user.name, tokenEmail.token).then(() => {
                console.log("[SERVER] Verification email has been sent!")
                return utils.requestJsonSuccess(res, codeStatus.OK, 'A verification email has been sent to ' + user.email + '.', utils.getCleanUser(user), tokenEmail.token)
            })
        })
    })
}

changeData = (req, res) => {
    const body = req.body

    if (body) return utils.requestJsonFailed(res, codeStatus.paymentRequired, 'You must provide a parameters to changed data!')

    UserSchema.findOneAndUpdate({_id: body.userId}, {
        $set: {'name': body.name, 'username': body.username, 'email': body.email, 'updateAt': new Date}
    }, {new: true}, (err, user) => {
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
        return utils.requestJsonSuccess(res, codeStatus.OK, 'The new data has been saved!', user)
    })
}

deleteUser = (req, res) => {

    const userId = req.body.userId
    if (!userId) return utils.requestJsonFailed(res, codeStatus.paymentRequired, 'You must provide a user id!')

    // Delete document user
    UserSchema.deleteOne({_id: userId}, (err) => {
        if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)

        // Delete document rating
        RatingSchema.deleteOne({_userId: userId}, (err) => {
            if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)

            // Delete document new contents
            newContents.deleteMany({_userId: userId}, (err) => {
                if (err) return utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                return utils.requestJsonSuccess(res, codeStatus.OK, 'Delete user.')
            })
        })
    })
}

module.exports = {
    signIn, signUp, sameField, sameFieldExceptUser, changeData, deleteUser
}
