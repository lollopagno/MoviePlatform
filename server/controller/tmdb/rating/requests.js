const https = require('https');
const utils = require('../../../utils/commons')
const contents = require('../../../utils/contents')
const RatingSchema = require('../../../model/rating')

function getDetails(options, userId, category, callback) {

    const req = https.get(options, (result) => {

        let allData = '';

        if (result.statusCode === 200) {
            result.setEncoding('utf8');
            result.on('data', (data) => {
                allData += data
            }).on("error", err => {
                callback([])
            }).on('close', () => {

                const content = JSON.parse(allData)
                search(userId, content.id, category).then(value => {
                    if (category !== contents.ACTORS) {
                        callback({
                            _id: content.id,
                            title: category === contents.MOVIES? content.original_title: content.original_name,
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
    req.on("error", () => {
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
