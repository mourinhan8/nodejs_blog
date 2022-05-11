const Post = require('../models/Post');
const { multipleMongooseToObj } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res, next) {
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
                    title: 'Home',
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /search
    search(req, res) {
        res.render('search', { title: 'Home' });
    }
}

module.exports = new SiteController();
