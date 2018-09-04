const AccountModel = require("../models").Account;
const EmeterModel = require("../models").Emeter;
const CusinfoInfoModel = require("../models").CusinfoInfo;

class Account {
    constructor() {
    }

    async delAccount(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {

            if (req.body._id) {
                await AccountModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
            }
            res.send({
                state: 'success',
                id: req.body._id
            });
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '保存数据失败:',
            })
        }
    }

    async addAccount(req, res, next) {
        var cusId = req.body.cusId;
        var emeId = req.body.emeId;
        var meterType = req.body.meterType;

        try {
            let account = await AccountModel.findOne({meterId: emeId, status: 1}).exec();
            if (!account) {// 未开户
                let mem = await EmeterModel.findOne({_id: emeId, status: 1}).exec();//获得电卡信息
                //更新客户信息
                await CusinfoInfoModel.findOneAndUpdate({
                    _id: cusId
                }, {
                    $set: {estatus: 1, classAllPath: mem.classAllPath}
                });
                //更新电表信息
                await EmeterModel.findOneAndUpdate({_id: emeId}, {$set: {bzstatus: 1}});

                const account = new AccountModel({
                    cusinfoId: cusId,
                    meterType: meterType,
                    meterId: emeId,
                    meterNo: mem.no
                })
                await account.save();
                res.send({
                    state: 'success',
                    id: account._id
                });
            } else {
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '该卡已经开户:',
                })
            }
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '保存数据失败:',
            })
        }
    }

    async getAccount(req, res, next) {
        var fi = {meterType: 'e'}
        if (req.query.no && req.query.no != 'null') {
            fi.no = new RegExp(req.query.no, 'gi');
        }
        if (req.query.cusinfoId && req.query.cusinfoId != 'null') {
            fi.cusinfoId = new RegExp(req.query.cusinfoId, 'gi');
        }

        if (req.query.status != null) {
            fi.status = req.query.status;
        } else {
            fi.status = 1
        }

        try {
            let companyInfos = await AccountModel.find(fi).populate({
                path: 'cusinfoId',
                select: {name: 1, _id: 1}
            }).populate({
                path: 'meterId',
                select: {name: 1, _id: 1, classAllPath: 1, no: 1},
                model: EmeterModel,
            }).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await AccountModel.count(fi);
            res.send({
                state: 'success',
                companyInfos: companyInfos,
                total: totalItems
            });
        } catch (err) {
            res.send({
                state: 'error',
                message: err.message
            })
        }
    }

    async addBalance(req, res, next) {
        var id = req.body._id;
        var balance = req.body.balance;

        try {
            let account = await AccountModel.findOne({_id: id}).exec();
            if (account) {// 未开户
                var allBalance = parseFloat(account.balance) + parseFloat(balance)
                //更新电表信息
                await AccountModel.findOneAndUpdate({_id: id}, {$set: {balance: allBalance}});
                res.send({
                    state: 'success',
                    id: account._id
                });
            } else {
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '保存数据失败:',
                })
            }
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '保存数据失败:',
            })
        }
    }
}

module.exports = new Account();