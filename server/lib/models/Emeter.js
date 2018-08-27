var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var EmeterSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    no: {
        type: String,
        unique: true
    },
    cusinfoId: {type: String, ref: 'CusinfoInfo'},
    routeId: String,
    classAllPath: [],
    routeAllPath: [],
    classId: String,
    name: String,
    allname: String,
    address: String,
    contacts: String,
    mPort: String,//串口号
    mIp: String,//表号
    typeNo: String, //型号
    tel: String,
    ct: String,
    ifyff: String,
    introduction: String,
    bzstatus: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },//0-失效 1-生效
    date: {
        type: Date,
        default: Date.now
    },
});


var Emeter = mongoose.model("Emeter", EmeterSchema);

module.exports = Emeter;