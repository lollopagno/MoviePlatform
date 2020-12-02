const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const HOST = 'api.themoviedb.org'

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

search = (req, res) => {
    const options = {
        host: HOST,
        path: PATH_SEARCH + KEY + "&query=" + (req.query.query).replace(/\s/g, '%20')
    };
    getInfo(res, options)
}

function getInfo(res, option_requests) {

    https.get(option_requests, (result) => {

        let allData = ''
        let TVs = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', (data) => {
                allData += data
            }).on("error", err => {
                utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            }).on('close', () => {
                JSON.parse(allData).results.forEach((tv) => {
                    TVs.push({
                        _id: tv.id,
                        title: tv.original_name,
                        date: tv.first_air_date,
                        img: tv.poster_path !== null? IMAGE + tv.poster_path : null,
                        language: tv.original_language,
                        vote: tv.vote_average
                    })
                });
                utils.requestJsonSuccess(res, codeStatus.OK, 'Programs TV found.', TVs)
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Programs TV not found!')
        }
    })
}

module.exports = {
    popular, topRated, search
}
