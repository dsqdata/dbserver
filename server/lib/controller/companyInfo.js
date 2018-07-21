const CompanyInfoModel = require("../models").CompanyInfo;
const CommunityInfoModel = require("../models").CommunityInfo;
const FloorInfoModel = require("../models").FloorInfo;
const ClassInfoModel = require("../models").ClassInfo;

class CompanyInfo {
    constructor() {
    }

    async getCompanyInfoTree(req, res, next) {
        var fi = {status: 1}
        try {
            let companyInfos = await CompanyInfoModel.find(fi).sort({date: -1})
            let communityInfos = await CommunityInfoModel.find(fi).sort({date: -1})
            let floorInfos = await FloorInfoModel.find(fi).sort({date: -1})
            let classInfos = await ClassInfoModel.find(fi).sort({date: -1})
            res.send({
                state: 'success',
                companyList: companyInfos,
                communityList: communityInfos,
                floorList: floorInfos,
                classList: classInfos
            });
        } catch (err) {
            res.send({
                state: 'error',
                message: err.message
            })
        }
    }

    async delCompanyInfo(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {

            if (req.body._id) {
                await CompanyInfoModel.findOneAndUpdate({
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

    async addCompanyInfo(req, res, next) {
        const companyObj = {
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
                await CompanyInfoModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new CompanyInfoModel(companyObj);
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

    async getCompanyInfos(req, res, next) {
        console.log(req.query)

        var name = req.query.name
        var fi = {}
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
            let companyInfos = await CompanyInfoModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await CompanyInfoModel.count(fi);
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

module.exports = new CompanyInfo();