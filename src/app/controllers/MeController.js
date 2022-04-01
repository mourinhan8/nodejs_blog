const Post = require('../models/Post');
const { multipleMongooseToObj } = require('../../util/mongoose')

class MeController {

    // [GET] /me/stored/posts
    storedPosts(req, res, next) {
        Post.find({})
            .then(posts => res.render('me/stored-posts', { posts: multipleMongooseToObj(posts) }))
            .catch(next)
    }

}

module.exports = new MeController();
