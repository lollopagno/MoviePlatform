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
    console.log("API actors")
    https.get(url, (result) => {

        let actors = [];
        console.log("post")
        if (result.statusCode === 200) {
            result.setEncoding('utf8');

            result.on('data', function (data) {
                try {
                    data = JSON.parse(data)
                    data = data.results
                    data.forEach((actor) => {
                        actors.push({
                            _id: actor.id,
                            name: actor.name,
                            img: IMAGE + actor.profile_path,
                            popularity: actor.popularity,
                            department: actor.known_for_department
                        })
                    });
                    console.log(actors)
                    utils.requestJsonSuccess(res, codeStatus.OK, 'Actors found.', actors)
                } catch (err) { console.log("[ERR] "+err)}
            });
        } else {
            utils.requestJsonFailed(res, codeStatus.badRequest, 'Actors not found!')
        }
    })
}

module.exports = {
    popular
}

