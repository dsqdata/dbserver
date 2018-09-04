const CusinfoInfoModel = require("../models").CusinfoInfo;
const EmeterModel = require("../models").Emeter;

class CusinfoInfo {
    constructor() {
    }

    async delCusinfoInfo(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {

            if (req.body._id) {
                await CusinfoInfoModel.findOneAndUpdate({
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

    async addCusinfoInfo(req, res, next) {
        const companyObj = {
            name: req.body.name,
            address: req.body.address,
            allname: req.body.allname,
            introduction: req.body.introduction,
            tel: req.body.tel,
            contacts: req.body.contacts,
            type: 'cp',
            emeter: req.body.emeter,
            branch: req.branch
        }

        if (companyObj.emeter) {
            companyObj.estatus = 1;
        }

        try {
            if (req.body._id) {
                await CusinfoInfoModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new CusinfoInfoModel(companyObj);
                await companyInfo.save();
                if (companyObj.emeter) {
                    for (var i = 0; i < companyObj.emeter.length; i++) {
                        await EmeterModel.findOneAndUpdate({
                            _id: companyObj.emeter[i].meterId
                        }, {
                            $set: {bzstatus: 1}
                        });
                    }
                }
                res.send({
                    state: 'success',
                    id: companyInfo._id
                });
            }
        } catch (err) {
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '保存数据失败:',
            })
        }
    }

    async getCusinfoInfos(req, res, next) {
        var fi = {branch: req.branch};
        if (req.query.name && req.query.name != 'null') {
            fi.name = new RegExp(req.query.name, 'gi');
        }
        if (req.query._id && req.query._id != 'null') {
            fi._id = new RegExp(req.query._id, 'gi');
        }

        if (req.query.status != null) {
            fi.status = req.query.status;
        } else {
            fi.status = 1
        }

        try {
            let companyInfos = await CusinfoInfoModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await CusinfoInfoModel.count(fi);
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
}

module.exports = new CusinfoInfo();