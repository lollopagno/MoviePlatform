const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key='
const API_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key='
const API_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?api_key='
const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {
    getInfo(res, API_POPULAR + KEY)
}

topRated = (req, res) => {
    getInfo(res, API_TOP_RATED + KEY)
}

upcoming = (req, res) => {
    getInfo(res, API_UPCOMING + KEY)
}

function getInfo(res, url) {

    https.get(url, (result) => {

        let movies = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', function (data) {
                try {
                    (JSON.parse(data)).results.forEach((movie) => {
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
                } catch (err) {
                }
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Movies not found!')
        }
    })
}

module.exports = {
    popular, topRated, upcoming
}

