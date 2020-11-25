const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const API_POPULAR = 'https://api.themoviedb.org/3/person/popular?api_key='
const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {
    getInfo(res, API_POPULAR + KEY)
}

function getInfo(res, url) {

    https.get(url, (result) => {

        let actors = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', function (data) {
                try {
                    (JSON.parse(data)).results.forEach((actor) => {
                        actors.push({
                            _id: actor.id,
                            name: actor.name,
                            img: IMAGE + actor.profile_path,
                            //Todo aggiuengere informazioni dall API
                        })
                    });
                    utils.requestJsonSuccess(res, codeStatus.OK, 'Actors found.', actors)
                } catch (err) {
                }
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Actors not found!')
        }
    })
}

module.exports = {
    popular
}

