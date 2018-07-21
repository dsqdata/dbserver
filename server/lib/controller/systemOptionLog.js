const SystemOptionLogModel = require("../models").SystemOptionLog;

class SystemOptionLog {
    constructor() {
    }
    async getSystemOptionLogs(req, res, next) {
        try {
            let current = req.pageable.page || 1;
            let pageSize = req.pageable.limit || 10;
            let type = req.query.type, queryObj = {};
            if (type) queryObj.type = type;
            const SystemOptionLogs = await SystemOptionLogModel.find(queryObj).sort({date: -1}).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await SystemOptionLogModel.count(queryObj);
            var $page = {
                page: current
            };
            $page.records = totalItems;
            $page.total = Math.ceil(totalItems / pageSize)
            $page.rows = SystemOptionLogs;


            res.send($page)
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取SystemOptionLogs失败'
            })
        }
    }

    async delSystemOptionLogs(req, res, next) {
        try {
            let errMsg = '', targetIds = req.query.ids;
            if (targetIds === 'all') {
                await SystemOptionLogModel.remove({});
            } else {
                targetIds = targetIds.split(',');
                await SystemOptionLogModel.remove({'_id': {$in: targetIds}});
            }
            res.send({
                state: 'success'
            });
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '删除数据失败:' + err,
            })
        }
    }
}

module.exports = new SystemOptionLog();