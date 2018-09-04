const EmeterModel = require("../models").Emeter;

class Emeter {
    constructor() {
    }

    async delEmeter(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {

            if (req.body._id) {
                await EmeterModel.findOneAndUpdate({
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

    async addEmeter(req, res, next) {
        const companyObj = {
            no: req.body.no,
            //cusinfoId: req.body.cusinfoId._id,
            routeId: req.body.routeId,
            classAllPath: req.body.classAllPath,
            classId: req.body.classId,
            name: req.body.name,
            address: req.body.address,
            allname: req.body.allname,
            introduction: req.body.introduction,
            tel: req.body.tel,
            bzstatus: req.body.bzstatus,
            contacts: req.body.contacts,
            mPort: req.body.mPort,
            mIp: req.body.mIp,
            typeNo: req.body.typeNo,
            ct: req.body.ct,
            ifyff: req.body.ifyff,
            type: 'cp'
        }

        try {
            if (req.body._id) {
                await EmeterModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new EmeterModel(companyObj);
                await companyInfo.save();
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

    async getEmeters(req, res, next) {
        var fi = {}
        if (req.query.no && req.query.no != 'null') {
            fi.no = new RegExp(req.query.no, 'gi');
        }
        if (req.query.classAllPath && req.query.classAllPath != 'null') {
            fi.classAllPath = req.query.classAllPath
        }

        if (req.query.status != null) {
            fi.status = req.query.status;
        } else {
            fi.status = 1
        }

        try {
            let companyInfos = await EmeterModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await EmeterModel.count(fi);
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

    async getEmetersUnopen(req, res, next) {
        var fi = {}
        if (req.query.no && req.query.no != 'null') {
            fi.no = new RegExp(req.query.no, 'gi');
        }
        if (req.query.classAllPath && req.query.classAllPath != 'null') {
            fi.classAllPath = req.query.classAllPath
        }

        if (req.query.status != null) {
            fi.status = req.query.status;
        } else {
            fi.status = 1
        }
        fi.bzstatus = 0;
        try {
            let companyInfos = await EmeterModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await EmeterModel.count(fi);
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

module.exports = new Emeter();