const newsRouter = require('./news.routes');
const meRouter = require('./me.routes');
const postRouter = require('./post.routes');
const siteRouter = require('./site.routes');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/posts', postRouter);
    app.use('', siteRouter);
}

module.exports = route;
