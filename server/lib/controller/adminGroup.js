const AdminGroupModel = require("../models").AdminGroup;

class AdminGroup {
    constructor() {
        // super()
    }

    async getAdminGroups(req, res, next) {
        try {
            let current = req.pageable.page || 1;
            let pageSize = req.pageable.limit || 10;
            const AdminGroups = await AdminGroupModel.find({});
            const totalItems = await AdminGroupModel.count();
            var $page = {
                page: current
            };
            $page.records = totalItems;
            $page.total = Math.ceil(totalItems / pageSize)
            $page.rows = AdminGroups;
            res.send($page)
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取AdminGroups失败'
            })
        }
    }
}

module.exports = new AdminGroup();