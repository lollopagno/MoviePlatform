const RatingSchema = require('../../model/rating')
const codeStatus = require('../../utils/status')
const utils = require('../../utils/commons')

module.exports = {

    search: function (userId, contentId, category) {
        RatingSchema.find({
            $and: [{'_userId': userId}, {
                'content': [{
                    '_contentId': contentId,
                    'category': category,
                }]
            }]
        }, function (err, content) {
            if (err || content === undefined) return 0
            else return content.value
        })
    },

    update: async function (req, res) {
        const {userId, contentId, category, value} = req.body.params
        if (!userId || !contentId || !category || !value)
            return res.status(404).json({
                success: false,
                message: 'Must pass params',
            })

        RatingSchema.updateOne({'_userId': userId}, {'content._contentId': contentId},
            {
                $set: {
                    content: [{
                        category: category,
                        _contentId: contentId,
                        value: value
                    }]
                }
            },
            function (err, added) {
                console.log(added)
                console.log(err)
                if (err)
                    return res.status(404).json({
                        success: false,
                        message: err.message,
                    })
                else {
                    console.log("[NEW CONTENT UPDATED]")
                    return res.status(200).json({
                        success: true
                    })
                }
            })

        // Check document is created
        // await RatingSchema.findOne({$and: [{'_userId': userId}, {'category': category}, {'content': [{'_contentId': contentId}]}]}, function (err, result) {
        //     console.log("[RESULT FIND ONE] " + result)
        //     console.log("[ERR FIND ONE] " + err)
        //     if (err) {
        //         utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
        //     } else if (result === null) {
        //
        //         console.log("[DOCUMENT CREATED]")
        //         // Create document
        //         const newContent = new RatingSchema({
        //             _userId: userId,
        //             content: [{
        //                 category: category,
        //                 _contentId: contentId
        //             }]
        //         })
        //         newContent.save(function (err) {
        //             if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
        //             console.log("CONTENT SAVED")
        //         })
        //         updateData(res, userId, category, contentId, value)
        //     }else {
        //         updateData(res, userId, category, contentId, value)
        //     }
        // })
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
