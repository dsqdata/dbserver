const FloorInfoModel = require("../models").FloorInfo;

class FloorInfo {
    constructor() {
    }

    async delFloorInfo(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {

            if (req.body._id) {
                await FloorInfoModel.findOneAndUpdate({
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

    async addFloorInfo(req, res, next) {
        const companyObj = {
            companyId: req.body.companyId,
            companyName: req.body.companyName,
            communityId: req.body.communityId,
            communityName: req.body.communityName,



            name: req.body.name,
            address: req.body.address,
            allname: req.body.allname,
            introduction: req.body.introduction,
            tel: req.body.tel,
            contacts: req.body.contacts,
            type: 'cp'
        }

        try {
            if (req.body._id) {
                await FloorInfoModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new FloorInfoModel(companyObj);
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

    async getFloorInfos(req, res, next) {
        console.log(req.query)

        var name = req.query.name
        var fi = {}
        if (req.query.communityId && req.query.communityId != 'null' && req.query.communityId != 'undefined') {
            fi.communityId = new RegExp(req.query.communityId, 'gi');
        }
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
            let companyInfos = await FloorInfoModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await FloorInfoModel.count(fi);
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

module.exports = new FloorInfo();