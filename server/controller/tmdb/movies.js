const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

/**
 * Parameter to request a get api popular
 */
const HOST_POPULAR = 'api.themoviedb.org'
const PATH_POPULAR = '/3/movie/popular?api_key='

/**
 * Parameter to request a get api top rated
 */
const HOST_TOP_RATED = 'api.themoviedb.org'
const PATH_TOP_RATED = '/3/movie/top_rated?api_key='

/**
 * Parameter to request a get api upcoming
 */
const HOST_UPCOMING = 'api.themoviedb.org'
const PATH_UPCOMING = '/3/movie/upcoming?api_key='

const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {
    const options = {
        host: HOST_POPULAR,
        path: PATH_POPULAR + KEY
    };
    getInfo(res, options)
}

topRated = (req, res) => {
    const options = {
        host: HOST_TOP_RATED,
        path: PATH_TOP_RATED + KEY
    };
    getInfo(res, options)
}

upcoming = (req, res) => {
    const options = {
        host: HOST_UPCOMING,
        path: PATH_UPCOMING + KEY
    };
    getInfo(res, options)
}

function getInfo(res, options_requests) {

    https.get(options_requests, (result) => {

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
                        img: IMAGE + movie.poster_path,
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
}

module.exports = {
    popular, topRated, upcoming
}

