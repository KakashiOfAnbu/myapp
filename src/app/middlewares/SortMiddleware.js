module.exports = function (req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
        name: 'IDs',
    };
    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            name: req.query.column,
        });
    }
    next();
};
