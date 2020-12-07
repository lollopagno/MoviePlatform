const https = require('https');
const utils = require('../../../utils/commons')
const RatingSchema = require('../../../model/rating')

function getDetails(options, userId, category, callback) {

    const req = https.get(options, (result) => {

        if (result.statusCode === 200) {
            result.setEncoding('utf8');
            result.on("error", err => {
                return []
            }).on('data', async (data) => {

                const content = JSON.parse(data)
                search(userId, content.id, category).then(value => {

                    if (category !== 'Actors') {
                        callback({
                            _id: content.id,
                            title: content.original_title,
                            date: content.release_date,
                            img: content.poster_path !== null ? utils.IMAGE + content.poster_path : null,
                            language: content.original_language,
                            vote: content.vote_average,
                            rating: value,
                            category: category
                        })
                    } else {
                        callback({
                            _id: content.id,
                            name: content.name,
                            img: content.profile_path !== null ? utils.IMAGE + content.profile_path : null,
                            popularity: content.popularity,
                            department: content.known_for_department,
                            rating: value,
                            category: category
                        })
                    }
                })
            })
        } else {
            callback([])
        }
    })
    req.on("error", (err) => {
        callback([])
    })

    req.end()
}

async function search(userId, contentId, category) {
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
}

module.exports = {getDetails, search}
