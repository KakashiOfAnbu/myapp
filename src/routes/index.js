const newRouter = require('./news');
const siteRouter = require('./site');
const carRouter = require('./cars');
const meRouter = require('./me');
function route(app) {
    app.use('/news', newRouter);
    app.use('/me', meRouter);
    app.use('/cars', carRouter);
    app.use('/', siteRouter);
}

module.exports = route;
