var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var RouteInfoSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    no: {
        type: String,
        unique: true
    },
    floorAllPath: [],
    floorId: String,
    floorName: String,
    companyId: String,
    companyName: String,
    communityId: String,
    communityName: String,

    floorNo: Number,
    routeType: String,
    ip: String,
    port: Number,
    name: String,
    allname: String,
    address: String,
    contacts: String,
    tel: String,
    introduction: String,
    branch: {type: String, required: true},//所属公司
    status: {
        type: Number,
        default: 1
    },//0-失效 1-生效
    date: {
        type: Date,
        default: Date.now
    },
});
var RouteInfo = mongoose.model("RouteInfo", RouteInfoSchema);
module.exports = RouteInfo;