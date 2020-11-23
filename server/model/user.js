const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        admin: Boolean,
        isVerified: {type: Boolean, default: false},
        // TODO da verificare se questi due parametri sono da inserire
        passwordResetToken: String,
        passwordResetExpires: Date,
        createAt: {type: Date, required: true, default: Date.now},
        updateAt: {type: Date, required: true, default: Date.now}
    }, {
        versionKey: false
    });

module.exports = mongoose.model('User', userSchema, 'user');

