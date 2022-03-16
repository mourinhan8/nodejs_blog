const newsRouter = require('./news.routes')
const siteRouter = require('./site.routes')

function route(app) {
    app.use('/news', newsRouter)
    app.use('', siteRouter)
}

module.exports = route