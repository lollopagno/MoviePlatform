const KEY = require('../../utils/env').apiKeyTmdb
const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const contents = require('../../utils/contents')

const request = require('./request')

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

popular = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_POPULAR + KEY
    };

    const userId = req.query.userId
    request.waitData(contents.PROGRAM_TV, 'Popular', false, '', options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Program tv popular found!', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest, 'No internet connection!')
    })
}

topRated = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_TOP_RATED + KEY
    };

    const userId = req.query.userId
    request.waitData(contents.PROGRAM_TV, 'Top rated', false, '', options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Program tv popular found!', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest, 'No internet connection!')
    })
}

search = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_SEARCH + KEY + "&query=" + (req.query.query).replace(/\s/g, '%20')
    };

    const userId = req.query.userId
    request.waitData(contents.PROGRAM_TV, null, true, req.query.query, options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Program tv found!', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest, 'No internet connection!')
    })
}

module.exports = {
    popular, topRated, search
}
