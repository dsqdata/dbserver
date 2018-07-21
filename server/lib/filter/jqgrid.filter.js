const _ = require('lodash');
// Middleware for token verification
exports.gridPageFilter = function (req, res, next) {
    var query = {}
    query.page = parseInt(req.body.page || 1);
    query.limit = parseInt(req.body.rows || 20);
    var sidx = req.body.sidx || 'createdOn';
    if (req.body.sord == "desc") {
        sidx = "-" + sidx
    }
    query.sort = sidx;
    query.filter = req.body.filter || {}
    query.extend = req.body.extend || {}
    query.filterTool = req.body.filterTool || {}
    query.extendTool = req.body.extendTool || {}

    query.filte = _.assignIn(query.filter, query.filterTool);

    req.pageable = query;
    next(); //继续下一步路由
};