const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const API_POPULAR = 'https://api.themoviedb.org/3/tv/popular?api_key='
const API_TOP_RATED = 'https://api.themoviedb.org/3/tv/top_rated?api_key='
const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {
    getInfo(res, API_POPULAR + KEY)
}

topRated = (req, res) => {
    getInfo(res, API_TOP_RATED + KEY)
}

function getInfo(res, url) {

    https.get(url, (result) => {

        let TVs = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', function (data) {
                try {
                    (JSON.parse(data)).results.forEach((tv) => {
                        TVs.push({
                            _id: tv.id,
                            title: tv.original_name,
                            date: tv.first_air_date,
                            img: IMAGE + tv.poster_path,
                            language: tv.original_language,
                            vote: tv.vote_average
                        })
                    });
                    console.log(TVs)
                    utils.requestJsonSuccess(res, codeStatus.OK, 'Programs TV found.', TVs)
                } catch (err) {
                    console.log("[ERR] "+err)
                }
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Programs TV not found!')
        }
    })
}

module.exports = {
    popular, topRated
}
