const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const HOST = 'api.themoviedb.org'

const PATH_POPULAR = '/3/person/popular?api_key='
const PATH_SEARCH = '/3/search/person?api_key='

const IMAGE = 'https://image.tmdb.org/t/p/w500/'
// todo creare una soluzione su dove caricarla
const IMAGE_NOT_FOUND = 'https://www.svaghiamo.it/wp-content/uploads/2016/09/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'

popular = (req, res) => {

    const options = {
        host: HOST,
        path: PATH_POPULAR + KEY
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

function getInfo(res, options) {
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
                        img: actor.profile_path !== null? IMAGE + actor.profile_path : IMAGE_NOT_FOUND,
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
    popular, search
}

