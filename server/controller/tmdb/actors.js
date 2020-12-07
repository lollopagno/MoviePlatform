const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const rating = require('./rating/requests')
const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const CATEGORY = 'Actors'

const PATH_POPULAR = '/3/person/popular?api_key='
const PATH_SEARCH = '/3/search/person?api_key='

popular = (req, res) => {

    const options = {
        host: utils.HOST,
        path: PATH_POPULAR + KEY
    };
    getInfo(res, options, req.query.userId)
}

search = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_SEARCH + KEY + "&query=" + (req.query.query).replace(/\s/g, '%20')
    };
    getInfo(res, options, req.query.userId)
}

function getInfo(res, options, userId) {
    const req = https.get(options, (result) => {

        let allData = '';
        let actors = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');
            result.on('data', (data) => {
                allData += data
            }).on("error", err => {
                utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            }).on('close', () => {

                let countData = 0
                const data = JSON.parse(allData).results
                data.forEach((actor) => {

                    rating.search(userId, actor.id, CATEGORY).then(value => {
                        actors.push({
                            _id: actor.id,
                            name: actor.name,
                            img: actor.profile_path !== null ? utils.IMAGE + actor.profile_path : null,
                            popularity: actor.popularity,
                            department: actor.known_for_department,
                            rating: value
                        })

                        countData++
                        if (data.length === countData) utils.requestJsonSuccess(res, codeStatus.OK, 'Actors found.', actors)
                    })
                });
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Actors not found!')
        }
    })

    req.on("error", () => {
        utils.requestJsonFailed(res, codeStatus.serverError, "Connection refused. Internet error!")
    })

    req.end()
}


module.exports = {
    popular, search
}

