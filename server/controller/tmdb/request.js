const https = require('https');

const rating = require('./rating/requests')
const newContents = require('../tmdb/newContents/newContents')
const utils = require('../../utils/commons')
const categoryContents = require('../../utils/contents')

module.exports = {

    waitData: async (CATEGORY, SECTION, isSearch, searchQuery, options, userId) => {

        const contentsUser = await newContents.searchContentToShow(CATEGORY, SECTION, isSearch, searchQuery, userId)
        const contentsTmdb = await getInfo(CATEGORY, options, userId)

        return Promise.all([contentsTmdb, contentsUser])
    },
}

async function getInfo(category, options_requests, userId) {

    return new Promise((resolve, reject) => {
        const req = https.get(options_requests, result => {
            let allData = '';

            if (result.statusCode === 200) {
                result.setEncoding('utf8');
                result.on('data', (data) => {
                    allData += data
                }).on("error", (err) => {
                    reject(err.message)
                }).on('close', () => {
                    let contents = [];
                    let countData = 0

                    const data = JSON.parse(allData).results
                    if (data.length === 0) resolve(contents)
                    data.forEach((content) => {

                        rating.search(userId, content.id, category).then(value => {

                            if (category === categoryContents.MOVIES) contents.push(dataMovies(content, value))
                            else if (category === categoryContents.PROGRAM_TV) contents.push(dataTvs(content, value))
                            else if (category === categoryContents.ACTORS) contents.push(dataActors(content, value))

                            countData++
                            if (data.length === countData) resolve(contents)
                        })
                    })
                });
            } else {
                reject("Status code " + result.statusCode)
            }
        })
        req.on("error", (err) => {
            reject(err.message)
        })
        req.end()
    })
}

function dataMovies(content, value) {
    return {
        _id: content.id,
        title: content.original_title,
        date: content.release_date,
        img: content.poster_path !== null ? utils.IMAGE + content.poster_path : null,
        language: content.original_language,
        vote: content.vote_average,
        rating: value
    }
}

function dataTvs(content, value) {
    return {
        _id: content.id,
        title: content.original_name,
        date: content.first_air_date,
        img: content.poster_path !== null ? utils.IMAGE + content.poster_path : null,
        language: content.original_language,
        vote: content.vote_average,
        rating: value
    }
}

function dataActors(content, value) {
    return {
        _id: content.id,
        name: content.name,
        img: content.profile_path !== null ? utils.IMAGE + content.profile_path : null,
        popularity: content.popularity,
        department: content.known_for_department,
        rating: value
    }
}
