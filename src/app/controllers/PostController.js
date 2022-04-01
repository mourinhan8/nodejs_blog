const Post = require('../models/Post');
const { mongooseToObj } = require('../../util/mongoose');
const { render } = require('express/lib/response');

class PostController {

    // [GET] /posts/:slug
    show(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then((post) => {
                res.render('posts/show', { post: mongooseToObj(post) });
            })
            .catch(next)
    }

    // [GET] /posts/create 
    create(req, res) {
        res.render('posts/create');
    }

    // [POST] /posts/store 
    store(req, res, next) {
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const post = new Post(formData);
        post.save()
            .then(() => res.redirect('/'))
            .catch(error => {

            })
    }

    // [GET] /posts/:id/edit
    edit(req, res, next) {
        //console.log(req.params)
        Post.findById(req.params.id)
            .then(post => res.render('posts/edit', {
                post: mongooseToObj(post)
            }))
            .catch(next)
    }

    // [PUT] /posts/:id
    update(req, res) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/posts'))
    }
}

module.exports = new PostController();
