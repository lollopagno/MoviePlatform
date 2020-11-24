const KEY = require('../../utils/env').apiKeyTmdb
const https = require('https');

const utils = require('../../utils/commons')
const codeStatus = require('../../utils/status')

const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key='
const IMAGE = 'https://image.tmdb.org/t/p/w500/'

popular = () => {

    https.get(API_POPULAR + KEY, (res) => {

        let filmsPopular = {};

        if (res.statusCode === 200) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                (JSON.parse(data).results).forEach(film => {

                    filmsPopular.add({
                        _id: film.id,
                        title: film.original_title,
                        date: film.release_date,
                        img: IMAGE + film.poster_path,
                        language: film.original_language,
                    })
                });
            });
        }
        return filmsPopular;
    })
}

module.exports = {
    popular
}

