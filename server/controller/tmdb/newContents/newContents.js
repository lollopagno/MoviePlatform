const fs = require('fs');

const rating = require('../rating/requests')
const NewContentsSchema = require('../../../model/newContents')

const utils = require('../../../utils/commons')
const codeStatus = require('../../../utils/status')

module.exports = {

    added: function (req, res) {

        let {_userId, category} = req.body

        if (category !== 'Actors') {
            /* Movies and tv */
            const {title, date, language, vote, section} = req.body

            // CREATE new contents document
            const newContents = new NewContentsSchema({
                category: category,
                section: section,
                title: title,
                date: new Date(date),
                language: language,
                vote: vote,
                _userId: _userId
            })

            newContents.save(function (err, content) {
                if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                utils.requestJsonSuccess(res, codeStatus.OK, 'The content ' + content.title + ' has been added.', content)
            })

        } else {
            /* Actors */

            const {title, vote, department} = req.body

            // CREATE new contents document
            const newContents = new NewContentsSchema({
                category: category,
                _userId: _userId,
                title: title,
                department: department,
                vote: vote
            })

            newContents.save(function (err, content) {
                if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                else utils.requestJsonSuccess(res, codeStatus.OK, 'The content ' + content.title + ' has been added.', content)
            })
        }
    },

    updated: function (req, res) {

        if (!req.file) utils.requestJsonSuccess(res, codeStatus.serverError, 'File was not found.')
        else {
            const _id = req.headers['_id']
            const fileImg = req.file

            NewContentsSchema.findOneAndUpdate({_id: _id}, {
                $set: {'img.data': fs.readFileSync(fileImg.path), 'img.contentType': fileImg.mimetype}
            }, {new: true}, function (err, content) {
                if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                else {

                    // Delete image on directory server
                    fs.unlink(fileImg.path, err => {
                        if(err) console.log(err.message)
                    })
                    utils.requestJsonSuccess(res, codeStatus.OK, 'The content ' + content.title + ' has been added.')
                }
            })
        }
    },

    searchContentToShow: async function (CATEGORY, SECTION, isSearch, query, userId) {
        return new Promise(resolve => {

            let searchQuery= ''
            if(isSearch) searchQuery = {$and: [{'category': CATEGORY}, {'title' : { $regex : new RegExp(query, "i") }}]}
            else searchQuery = {$and: [{'category': CATEGORY}, {'section': SECTION}]}

            NewContentsSchema.find(searchQuery, (err, contentsUser) => {

                let countData = 0
                let allData = []

                if (contentsUser.length === 0) resolve(contentsUser)
                contentsUser.forEach(content => {
                    rating.search(userId, content._id, content.category).then(value => {
                        allData.push({
                            _id: content._id,
                            title: content.title,
                            date: content.date !== undefined ? content.date.getFullYear() + '-' + content.date.getMonth() + "-" + content.date.getDate() : undefined,
                            language: content.language,
                            vote: CATEGORY !== 'Actors' ? content.vote : undefined,
                            popularity: CATEGORY === 'Actors' ? content.vote : undefined,
                            department: CATEGORY === 'Actors' ? content.department : undefined,
                            rating: value,
                            img: content.img.data !== undefined ? `data:` + content.img.contentType + `;base64,` + new Buffer.from(content.img.data).toString('base64') : null
                        })

                        countData++
                        if (countData === contentsUser.length) {
                            resolve(allData)
                        }
                    })
                })
            })
        })
    },

    searchContentRate: async function(contentId, value) {
        return new Promise(resolve => {
            NewContentsSchema.find({_id: contentId}, (err, contentsUser) => {
                let allData = []
                let countData = 0

                if (contentsUser === undefined || contentsUser.length === 0) resolve(allData)
                else {
                    contentsUser.forEach(content => {
                        allData.push({
                            _id: content._id,
                            category: content.category,
                            title : content.title,
                            date : content.date !== undefined? content.date.getFullYear() + '-' + content.date.getMonth() + "-" + content.date.getDate(): undefined,
                            language: content.language,
                            vote: content.category !== 'Actors' ? content.vote : undefined,
                            popularity: content.category === 'Actors' ? content.vote : undefined,
                            department: content.department !== undefined? content.department : undefined,
                            rating: value,
                            img: content.img.data !== undefined ? `data:` + content.img.contentType + `;base64,` + new Buffer.from(content.img.data).toString('base64') : null
                        })
                        countData ++
                        if(countData === contentsUser.length) resolve(allData)
                    })
                }
            })
        })
    }
}
