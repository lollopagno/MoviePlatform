const KEY = require('../../utils/env').apiKeyTmdb

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')
const contents = require('../../utils/contents')

const request = require('./request')

/**
 * Parameter to request a get api popular
 */
const PATH_POPULAR = '/3/movie/popular?api_key='

/**
 * Parameter to request a get api top rated
 */
const PATH_TOP_RATED = '/3/movie/top_rated?api_key='

/**
 * Parameter to request a get api upcoming
 */
const PATH_UPCOMING = '/3/movie/upcoming?api_key='

/**
 * Parameter to request a get api to search movie
 */
const PATH_SEARCH = '/3/search/movie?api_key='

popular = (req, res) => {

    const options = {
        host: utils.HOST,
        path: PATH_POPULAR + KEY
    };

    const userId = req.query.userId
    request.waitData(contents.MOVIES, 'Popular', false, '', options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Movies popular found!', contents[0].concat(contents[1]))
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
    request.waitData(contents.MOVIES,  'Top rated', false, '', options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Movies top rated found!', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest, 'No internet connection!')
    })
}

upcoming = (req, res) => {
    const options = {
        host: utils.HOST,
        path: PATH_UPCOMING + KEY
    };

    const userId = req.query.userId
    request.waitData(contents.MOVIES,'Upcoming', false, '', options, userId)
        .then(contents => {
            return utils.requestJsonSuccess(res, codeStatus.OK, 'Movies upcoming found!', contents[0].concat(contents[1]))
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
    request.waitData(contents.MOVIES,null, true, req.query.query, options, userId)
        .then(contents => {
            return  utils.requestJsonSuccess(res, codeStatus.OK, 'Movies found', contents[0].concat(contents[1]))
        }).catch(() => {
        return utils.requestJsonFailed(res, codeStatus.badRequest,'No internet connection!')
    })
}

module.exports = {
    popular, topRated, upcoming, search
}

