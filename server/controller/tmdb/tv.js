const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const rating = require('./rating')
const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const CATEGORY = 'Tv'
/**
 * Parameter to request a get api popular
 */
const PATH_POPULAR = '/3/tv/popular?api_key='

/**
 * Parameter to request a get api top rated
 */
const PATH_TOP_RATED = '/3/tv/top_rated?api_key='

/**
 * Parameter to request a get api to search Tv programs
 */
const PATH_SEARCH = '/3/search/tv?api_key='

popular = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_POPULAR + KEY
    };
    getInfo(res, options, req.query.userId)
}

topRated = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_TOP_RATED + KEY
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

function getInfo(res, option_requests, userId) {
    const req = https.get(option_requests, (result) => {

        let allData = ''
        let TVs = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', (data) => {
                allData += data
            }).on("error", err => {
                utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            }).on('close', () => {

                let countData = 0
                const data = JSON.parse(allData).results
                data.results.forEach((tv) => {

                    rating.search(userId, tv.id, CATEGORY).then(value => {
                        TVs.push({
                            _id: tv.id,
                            title: tv.original_name,
                            date: tv.first_air_date,
                            img: tv.poster_path !== null ? utils.IMAGE + tv.poster_path : null,
                            language: tv.original_language,
                            vote: tv.vote_average,
                            rating: value
                        })

                        countData++
                        if (data.length === countData) utils.requestJsonSuccess(res, codeStatus.OK, 'Programs TV found.', TVs)
                    })
                });
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Programs TV not found!')
        }
    })
    req.on("error", () => {
        utils.requestJsonFailed(res, codeStatus.serverError, "Connection refused. Internet error!")
    })

    req.end()
}

module.exports = {
    popular, topRated, search
}
