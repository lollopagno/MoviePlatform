const KEY = require('../../utils/env').apiKeyTmdb

const utils = require('../../utils/commons')
const contents = require('../../utils/contents')
const codeStatus = require('../../utils/status')

const request = require('./request')

const PATH_POPULAR = '/3/person/popular?api_key='
const PATH_SEARCH = '/3/search/person?api_key='

popular = (req, res) => {
    if(req.query) return utils.requestJsonFailed(res, codeStatus.badRequest, 'You must pass a id!')
    const userId = req.query.userId

    const options = {
        host: utils.HOST,
        path: PATH_POPULAR + KEY
    };

    request.waitData(contents.ACTORS, null, false, '', options, userId)
        .then(contents => {
            return  utils.requestJsonSuccess(res, codeStatus.OK, 'Actors found!', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest, 'No internet connection!')
    })
}

search = (req, res) => {
    if(req.query) return utils.requestJsonFailed(res, codeStatus.badRequest, 'You must pass a id!')
    const userId = req.query.userId

    const options = {
        host: utils.HOST,
        path: PATH_SEARCH + KEY + "&query=" + (req.query.query).replace(/\s/g, '%20')
    };

    request.waitData(contents.ACTORS, null,true, req.query.query, options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Actors found!', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest, 'No internet connection!')
    })
}

module.exports = {
    popular, search
}

