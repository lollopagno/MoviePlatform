const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const HOST = 'api.themoviedb.org'
const PATH = '/3/person/popular?api_key='
const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = (req, res) => {

    const options = {
        host: HOST,
        path: PATH + KEY
    };

    https.get(options, (result) => {

        let allData = '';
        let actors = [];

        if (result.statusCode === 200) {
            result.setEncoding('utf8');
            result.on('data', (data) => {
                allData += data
            }).on("error", err => {
                utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
            }).on('close', () => {
                JSON.parse(allData).results.forEach((actor) => {
                    actors.push({
                        _id: actor.id,
                        name: actor.name,
                        img: IMAGE + actor.profile_path,
                        popularity: actor.popularity,
                        department: actor.known_for_department
                    })
                });
                utils.requestJsonSuccess(res, codeStatus.OK, 'Actors found.', actors)
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Actors not found!')
        }
    })
}

module.exports = {
    popular
}

