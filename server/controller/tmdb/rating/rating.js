const RatingSchema = require('../../../model/rating')
const requests = require('../rating/requests')

const KEY = require('../../../utils/env').apiKeyTmdb

const utils = require('../../../utils/commons')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

module.exports = {

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

    searchAll: async function (req, res) {

        const {userId, isMovies, isTvs, isActors} = req.query
        if (!userId || !isMovies || !isTvs || !isActors)
            return res.status(404).json({
                success: false,
                message: 'Must pass params',
            })

        const eqMovies = {$eq: ['$$item.category', isMovies === 'true' ? "Movies" : '']}
        const eqTvs = {$eq: ['$$item.category', isTvs === 'true' ? "Tv" : '']}
        const eqActors = {$eq: ['$$item.category', isActors === 'true' ? "Actors" : '']}

        let result = await RatingSchema.aggregate([

            {$match: {_userId: ObjectId(userId)}},
            {
                $project: {
                    content: {
                        $filter: {
                            input: '$content',
                            as: 'item',
                            cond: {
                                $or: [
                                    eqMovies,
                                    eqTvs,
                                    eqActors
                                ]
                            }
                        }
                    }
                }
            }
        ])

        this.result = result[0].content
        if (this.result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No contents found!',
            })
        } else {
            getApiContents(res, userId, this.result)
        }
    },
}

function getApiContents(res, userId, result) {

    let countContent = 0
    let allContent = [];
    result.forEach(elem => {

        let CATEGORY = ''
        let options = {}

        switch (elem.category) {
            case 'Movies':
                CATEGORY = 'Movies'
                options = {
                    host: utils.HOST,
                    path: '/3/movie/' + elem._contentId + '?api_key=' + KEY
                };
                break;
            case 'Tv':
                CATEGORY = 'Tv programs'
                options = {
                    host: utils.HOST,
                    path: '/3/tv/' + elem._contentId + '?api_key=' + KEY
                };
                break;
            case 'Actors':
                CATEGORY = 'Actors'
                options = {
                    host: utils.HOST,
                    path: '/3/person/' + elem._contentId + '?api_key=' + KEY
                };
                break;
        }

        requests.getDetails(options, userId, CATEGORY, obj => {
            if (Object.keys(obj).length !== 0) {
                allContent.push(obj)
                countContent++
                if (result.length === countContent) {
                    return res.status(200).json({
                        success: true,
                        message: 'Contents found!',
                        data: allContent
                    })
                }
            }
        })
    })
}

