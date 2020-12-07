const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const rating = require('./rating/requests')
const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const CATEGORY = 'Movies'

/**
 * Parameter to request a get api popular
 */
const PATH_POPULAR = '/3/movie/popular?api_key='

/**
 * Parameter to request a get api top rated
 */
const PATH_TOP_RATED = '/3/movie/top_rated?api_key='

/**
 * Parameter to request a get api upcoming
 */
const PATH_UPCOMING = '/3/movie/upcoming?api_key='

/**
 * Parameter to request a get api to search movie
 */
const PATH_SEARCH = '/3/search/movie?api_key='

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

upcoming = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_UPCOMING + KEY
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

function getInfo(res, options_requests, userId) {
    const req = https.get(options_requests, (result) => {

            let allData = '';
            let movies = [];

            if (result.statusCode === 200) {
                result.setEncoding('utf8');
                result.on('data', (data) => {
                    allData += data
                }).on("error", err => {
                    utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                }).on('close', () => {

                    let countData = 0
                    const data = JSON.parse(allData).results
                    data.forEach((movie) => {

                        rating.search(userId, movie.id, CATEGORY).then(value => {
                            movies.push({
                                _id: movie.id,
                                title: movie.original_title,
                                date: movie.release_date,
                                img: movie.poster_path !== null ? utils.IMAGE + movie.poster_path : null,
                                language: movie.original_language,
                                vote: movie.vote_average,
                                rating: value
                            })

                            countData++
                            if (data.length === countData) utils.requestJsonSuccess(res, codeStatus.OK, 'Movies found.', movies)
                        })
                    })
                });
            } else {
                utils.requestJsonFailed(res, codeStatus.badRequest, 'Movies not found!')
            }
        }
    )

    req.on("error", () => {
        utils.requestJsonFailed(res, codeStatus.serverError, "Connection refused. Internet error!")
    })

    req.end()
}

module.exports = {
    popular, topRated, upcoming, search
}

