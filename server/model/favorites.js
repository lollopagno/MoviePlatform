const mongoose = require('mongoose');
const favorites = mongoose.Schema(
    {
        _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        content: [{
            category: {type: String, required: true},
            _contentId: {type: String, required: true},
        }]
    }, {
        versionKey: false
    });

module.exports = mongoose.model('Favorites', favorites, 'favorites');
