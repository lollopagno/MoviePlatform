const mongoose = require('mongoose');
const rating = mongoose.Schema(
    {
        _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        content: [{
            category: {type: String},
            _contentId: {type: String, unique: true},
            value: {type: String, default: '0'}
        }]
    }, {
        versionKey: false
    });

module.exports = mongoose.model('Rating', rating, 'rating');
