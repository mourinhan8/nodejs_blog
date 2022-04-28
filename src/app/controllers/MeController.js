const Post = require("../models/Post");
const { multipleMongooseToObj } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/posts
  storedPosts(req, res, next) {

    let postsQuery = Post.find({});
    
    if (req.query.hasOwnProperty("_sort")) {
      postsQuery = postsQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([postsQuery, Post.countDocumentsDeleted()]).then(
      ([posts, deletedCount]) =>
        res.render("me/stored-posts", {
          deletedCount,
          posts: multipleMongooseToObj(posts),
        })
    );
  }

  // [GET] /me/trash/posts
  trashPosts(req, res, next) {
    Post.findDeleted({})
      .then((posts) =>
        res.render("me/trash-posts", {
          posts: multipleMongooseToObj(posts),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
