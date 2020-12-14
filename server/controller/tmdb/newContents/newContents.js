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
                section : section,
                title: title,
                date: new Date(date),
                language: language,
                vote: vote,
                _userId: _userId
            })

            newContents.save(function (err, content) {
                if (err) utils.requestJsonFailed(res, codeStatus.badRequest, err.message)
                utils.requestJsonSuccess(res, codeStatus.OK, 'The Content '+content.title +' has been added.', content)
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
                else utils.requestJsonSuccess(res, codeStatus.OK, 'The Content '+content.title +' has been added.', content)
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
                else utils.requestJsonSuccess(res, codeStatus.OK, 'The Content '+content.title +' has been added.')
            })
        }
    },

    searchContentToShow: async function (userId) {
        NewContentsSchema.find().then(contents => {
            let allData = []
            let countData = 0
            contents.forEach(content => {
                rating.search(userId, content._id, content.category).then(value => {
                    content.rating = value
                    allData.push(content)
                    countData++
                    if (countData === contents.length) return allData
                })
            })
        })
    }
}
