module.exports = function (req, res, next) {
    const limit = 10;
    res.paginatedResults = {};
    res.paginatedResults.limit = 10;
    res.paginatedResults.startIndex = 0;
    if (req.query.page) {
        let thisPage = parseInt(req.query.page);
        res.paginatedResults.startIndex = (thisPage - 1) * limit;
    }
    next();
};
