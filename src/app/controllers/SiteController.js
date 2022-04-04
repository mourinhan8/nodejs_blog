const Post = require('../models/Post');
const { multipleMongooseToObj } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res) {
        // Callback
        // Post.find({}, function (err, posts, next) {
        //     if (!err){
        //         res.json(posts);
        //     } else {
        //         //res.status(400).json({ error: 'ERROR!!!' })
        //          next(err)
        //     }
        // });

        // Promise
        Post.find({})
            .then((posts) => {
                res.render('home', {
                    posts: multipleMongooseToObj(posts),
                });
            })
            .catch((err) => next(err));
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
