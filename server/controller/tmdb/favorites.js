const FavoritesSchema = require('../../model/favorites')

module.exports = {

    search: function (userId, contentId, category) {
        FavoritesSchema.find({
            $and: [{'_userId': userId}, {
                'content': [{
                    '_contentId': contentId,
                    'category': category
                }]
            }]
        }, function (err, content) {
            if (err) return false
            else return content != null;
        })
    },

    add: function (userId, contentId, category) {
        const newContent = new FavoritesSchema({
            _userId: userId,
            content: [{
                category: category,
                _contentId: contentId
            }]
        });

        newContent.save(function (err, content) {
            if (err) return []
            else {
                console.log("[NEW CONTENT ADDED]")
                return content
            }
        })
    },

    delete: function (id) {
        FavoritesSchema.deleteOne({_id: id}, function (err, result) {
            if (err) return false
            else {
                return result.deleteOne !== 0;
            }
        })
    },

    searchAll: function (userId) {
        FavoritesSchema.find({'_userId': userId}, function (err, result) {
            if (err) return false
            else if (result.size === 0) return false
            else return result
        })
    }
}
