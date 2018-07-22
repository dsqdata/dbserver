const ClassInfoModel = require("../models").ClassInfo;
const RouteInfoModel = require("../models").RouteInfo;

class ClassInfo {
    constructor() {
    }

    async delClassInfo(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {
            if (req.body._id) {
                await ClassInfoModel.findOneAndUpdate({
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

    async addClassInfo(req, res, next) {
        const companyObj = {
            floorId: req.body.floorId,
            floorName: req.body.floorName,
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
                await ClassInfoModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new ClassInfoModel(companyObj);
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

    async getClassInfos(req, res, next) {
        console.log(req.query)

        var name = req.query.name
        var fi = {}
        if (req.query.floorId && req.query.floorId != 'null' && req.query.floorId != 'undefined') {
            fi.floorId = new RegExp(req.query.floorId, 'gi');
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
            let companyInfos = await ClassInfoModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await ClassInfoModel.count(fi);
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


    async delRouteInfo(req, res, next) {
        const companyObj = {
            status: 0,
        }
        try {
            if (req.body._id) {
                await RouteInfoModel.findOneAndUpdate({
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

    async addRouteInfo(req, res, next) {
        const companyObj = {
            floorId: req.body.floorId,
            floorName: req.body.floorName,
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
                await RouteInfoModel.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $set: companyObj
                });
                res.send({
                    state: 'success',
                    id: req.body._id
                });
            } else {
                const companyInfo = new RouteInfoModel(companyObj);
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

    async getRouteInfos(req, res, next) {
        console.log(req.query)

        var name = req.query.name
        var fi = {}
        if (req.query.floorId && req.query.floorId != 'null' && req.query.floorId != 'undefined') {
            fi.floorId = new RegExp(req.query.floorId, 'gi');
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
            let companyInfos = await RouteInfoModel.find(fi).sort({
                date: -1
            }).skip(Number(req.query.ps) * (Number(req.query.pi) - 1)).limit(Number(req.query.ps))

            const totalItems = await RouteInfoModel.count(fi);
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

module.exports = new ClassInfo();