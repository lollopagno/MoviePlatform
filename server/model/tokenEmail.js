const mongoose = require('mongoose');
const tokenEmailSchema = mongoose.Schema(
    {
        _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        token: {type: String, required: true},
        createdAt: {type: Date, required: true, default: Date.now, expires: 43200 /* seconds = 12 hours */}
    }, {
        versionKey: false
    });

module.exports = mongoose.model('TokenEmail', tokenEmailSchema, 'tokenEmail');
