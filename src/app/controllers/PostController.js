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
            .catch(next);
    }

    // [GET] /posts/create
    create(req, res) {
        res.render('posts/create');
    }

    // [POST] /posts/store
    store(req, res, next) {
        const formData = { ...req.body };
        formData.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const post = new Post(formData);
        post.save()
            .then(() => res.redirect(`/posts/${post.slug}`))
            .catch((error) => {});
    }

    // [GET] /posts/:id/edit
    edit(req, res, next) {
        //console.log(req.params)
        Post.findById(req.params.id)
            .then((post) =>
                res.render('posts/edit', {
                    post: mongooseToObj(post),
                }),
            )
            .catch(next);
    }

    // [PUT] /posts/:id
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => Post.findById(req.params.id))
            .then((post) => {
                var slug = post.slug;
                res.redirect(`/posts/${slug}`);
            })
            .catch(next);
    }

    // [DELETE] /posts/:id
    destroy(req, res, next) {
        Post.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /posts/:id/force-delete
    forceDestroy(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /posts/:id/restore
    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /posts/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Post.delete({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new PostController();
