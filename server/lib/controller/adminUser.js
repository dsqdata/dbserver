const AdminUserModel = require("../models").AdminUser;
const AdminResourceModel = require("../models").AdminResource;


class AdminUser {
    constructor() {
        // super()
    }

    async loginAction(req, res, next) {
        try {
            const userObj = {
                userName: req.body.uname,
                //password: req.body.password
            }
            let user = await AdminUserModel.findOne(userObj).populate([{
                path: 'group',
                select: 'power _id enable name'
            }]).exec();
            if (user) {
                if (!user.enable) {
                    res.send({
                        state: 'error',
                        message: "该用户已被限制登录，请稍后重试"
                    });
                }
                //req.session.adminPower = user.group.power;
                // req.session.adminlogined = true;
                // req.session.adminUserInfo = user;

                // 记录登录日志
                let clientIp = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                res.send({
                    state: 'success',
                    loginUser: user
                });
            } else {
                res.send({
                    state: 'error',
                    message: "用户名或密码错误"
                });
            }
        } catch (err) {
            res.send({
                state: 'error',
                message: err.message
            })
        }
    }

    async getAdminUsers(req, res, next) {
        try {
            let current = req.pageable.page || 1;
            let pageSize = req.pageable.limit || 10;
            const adminUsers = await AdminUserModel.find({}, {password: 0}).sort({
                date: -1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate({
                path: 'group',
                select: "name _id"
            }).exec();
            const totalItems = await AdminUserModel.count();

            var $page = {
                page: current
            };
            $page.records = totalItems;
            $page.total = Math.ceil(totalItems / pageSize)
            $page.rows = adminUsers;
            res.send($page)
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取adminUsers失败'
            })
        }
    }
}

module.exports = new AdminUser();