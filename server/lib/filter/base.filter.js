const _ = require('lodash');
// Middleware for token verification
exports.baseFilter = function (req, res, next) {

    const token = (req.body && req.body.token)
        || (req.query && req.query.token)
        || req.headers['token'];
    console.log(token)

    const branch = (req.body && req.body.access_branch)
        || (req.query && req.query.access_branch)
        || req.headers['x-access-branch'];
    console.log(branch)

    req.token = token;
    req.branch = branch;
    next(); //继续下一步路由
};