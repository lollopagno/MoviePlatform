const RatingSchema = require('../../model/rating')

module.exports = {

    search: async function (userId, contentId, category) {
        const result = await RatingSchema.findOne({'_userId': userId}).select({
            content: {
                $elemMatch: {
                    '_contentId': contentId,
                    'category': category
                }
            }
        })

        if (result.content.length === 0) return 0
        else return result.content[0].value
    },

    update: async function (req, res) {

        const {userId, contentId, category, value} = req.body.params
        if (!userId || !contentId || !category || !value)
            return res.status(404).json({
                success: false,
                message: 'Must pass params',
            })

        const updated = await RatingSchema.findOneAndUpdate(
            {'_userId': userId, 'content._contentId': contentId},
            {$set: {'content.$.value': value}})

        if (updated === null) {

            // Added content to document
            await RatingSchema.updateOne(
                {'_userId': userId},
                {
                    $push: {
                        content: {
                            category: category,
                            _contentId: contentId,
                            value: value
                        }
                    }
                })
            console.log("[CONTENT ADDED]")
            return res.status(200).json({
                success: true
            })
        } else {
            console.log("[CONTENT UPDATED]")
            return res.status(200).json({
                success: true
            })
        }
    },

    delete: function (id) {
        RatingSchema.deleteOne({_id: id}, function (err, result) {
            if (err) return [false, err.message]
            else if (result.deleteOne === 0) return [false, 'Content isn\'t present.']
            else return [true, result];
        })
    },

    searchAll: function (userId) {
        RatingSchema.find({'_userId': userId}, function (err, result) {
            if (err) return [false, err.message]
            else if (result.size === 0) return [false, 'No contents found.']
            else return [true, result]
        })
    }
}
