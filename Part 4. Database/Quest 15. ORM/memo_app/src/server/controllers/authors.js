const Author = require('../models').Author;
const Memo = require('../models').Memo;

module.exports = {
    findAll(req, res) {
        Author.findAll({
            include: Memo
        }).then(authors => {
            sendResult(res, authors);
        }).catch(error => {
            sendError(res, error);
        });
    },
    findById(req, res) {
        Author.findById(req.params.id, {
            include: Memo
        }).then(author => {
            sendResult(res, author);
        }).catch(error => {
            sendError(res, error);
        });
    },
    create(req, res) {
        Author.create(
            // req.body
            {
                name: req.body.name
            }
        ).then(newAuthor => {
            sendResult(res, newAuthor);
        }).catch(error => {
            sendError(res, error);
        });
    },
    update(req, res) {
        Author.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }
        ).then(updatedAuthor => {
            sendResult(res, updatedAuthor);
        }).catch(error => {
            sendError(res, error);
        });
    },
    delete(req, res) {
        Author.destroy({
            where: {
                id: req.params.id
            }
        }).then(deleteRecord => {
            sendResult(res, deleteRecord);
        }).catch(error => {
            sendError(res, error);
        });
    }
}

// helper
function sendResult(res, result) {
    res.status(200).json(result);
}

function sendError(res, result) {
    res.status(500).json(result);
}