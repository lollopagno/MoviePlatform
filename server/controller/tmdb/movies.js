const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const HOST = 'api.themoviedb.org'

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

const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {
    const options = {
        host: HOST,
        path: PATH_POPULAR + KEY
    };
    getInfo(res, options)
}

topRated = (req, res) => {
    const options = {
        host: HOST,
        path: PATH_TOP_RATED + KEY
    };
    getInfo(res, options)
}

upcoming = (req, res) => {
    const options = {
        host: HOST,
        path: PATH_UPCOMING + KEY
    };
    getInfo(res, options)
}

search = (req, res) => {
    const options = {
        host: HOST,
        path: PATH_SEARCH + KEY + "&query=" + (req.query.query).replace(/\s/g, '%20')
    };
    getInfo(res, options)
}

function getInfo(res, options_requests) {
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
                JSON.parse(allData).results.forEach((movie) => {
                    movies.push({
                        _id: movie.id,
                        title: movie.original_title,
                        date: movie.release_date,
                        img: movie.poster_path !== null ? IMAGE + movie.poster_path : null,
                        language: movie.original_language,
                        vote: movie.vote_average
                    })
                });
                utils.requestJsonSuccess(res, codeStatus.OK, 'Movies found.', movies)

            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Movies not found!')
        }
    })

    req.on("error", err => {
        utils.requestJsonFailed(res, codeStatus.serverError, "Connection refused. Internet error!")
    })

    req.end()
}

module.exports = {
    popular, topRated, upcoming, search
}

