const Post = require('../models/Post');
class SiteController {
    // [GET] /
    index(req, res) {

        Post.find({}, function (err, posts) {
            if (!err){
                res.json(posts);
            } else {
                res.status(400).json({ error: 'ERROR!!!' })
            }
        });
        
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
