const CommunityInfoModel = require("../models").CommunityInfo;


class CommunityInfo {
    constructor() {
    }

    async delCommunityInfo(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {

            if (req.body._id) {
                await CommunityInfoModel.findOneAndUpdate({
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

    async addCommunityInfo(req, res, next) {
        const companyObj = {
            companyId: req.body.companyId,
            companyName: req.body.companyName,
            name: req.body.name,
            address: req.body.address,
            allname: req.body.allname,
            introduction: req.body.introduction,
            tel: req.body.tel,
            contacts: req.body.contacts,
            type: 'cp',
        }

        try {
            if (req.body._id) {
                await CommunityInfoModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new CommunityInfoModel(companyObj);
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

    async getCommunityInfos(req, res, next) {
        var fi = {companyId: req.companyId}

        if (req.query.companyId && req.query.companyId != 'null' && req.query.companyId != 'undefined') {
            fi.companyId = new RegExp(req.query.companyId, 'gi');
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
            let companyInfos = await CommunityInfoModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await CommunityInfoModel.count(fi);
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

module.exports = new CommunityInfo();