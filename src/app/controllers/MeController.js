const Post = require('../models/Post');
const { multipleMongooseToObj } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/posts
    storedPosts(req, res, next) {
        Promise.all([Post.find({}).sortable(req), Post.countDocumentsDeleted()])
            .then(([posts, deletedCount]) =>
                res.render('me/stored-posts', {
                    deletedCount,
                    posts: multipleMongooseToObj(posts),
                    title: 'List',
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/posts
    trashPosts(req, res, next) {
        Post.findDeleted({})
            .then((posts) =>
                res.render('me/trash-posts', {
                    posts: multipleMongooseToObj(posts),
                    title: 'Trash',
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
