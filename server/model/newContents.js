const mongoose = require('mongoose');
const newContents = mongoose.Schema(
    {
        title: {type: String},
        releaseDate: {type: Date},      /* only movies/tv */
        language: {type: String},       /* only movies/tv */
        department: {type: String},     /* only actors */
        vote: {type: Number},           /* vote for movies/tv, popularity for actors */
        image: {data: Buffer, contentType: String},
        _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    }, {
        versionKey: false
    });

module.exports = mongoose.model('NewContents', newContents, 'newContents');
