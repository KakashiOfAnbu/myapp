const newRouter = require('./news');
const siteRouter = require('./site');
const carRouter = require('./cars');
function route(app) {
    app.use('/news', newRouter);

    app.use('/cars', carRouter);
    app.use('/', siteRouter);
}

module.exports = route;
