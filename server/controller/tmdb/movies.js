const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key='
const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {

    https.get(API_POPULAR + KEY, (result) => {

        let moviesPopular = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', function (data) {
                try {
                    (JSON.parse(data)).results.forEach((movie) => {
                        moviesPopular.push({
                            _id: movie.id,
                            title: movie.original_title,
                            date: movie.release_date,
                            img: IMAGE + movie.poster_path,
                            language: movie.original_language,
                        })
                    });
                    utils.requestJsonSuccess(res, codeStatus.OK, 'Movies found.', moviesPopular)
                } catch (err) {
                    console.log("[ERROR] " + err)
                }
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Movies not found!')
        }
    })
}

module.exports = {
    popular
}

