var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var CusinfoInfoSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    classAllPath: [],
    name: String,
    allname: String,
    address: String,
    contacts: String,
    tel: String,
    introduction: String,
    estatus:{//电卡开户
        type: Number,
        default: 0 //0- no 1- yes
    },
    wstatus:{//水卡开户
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


var CusinfoInfo = mongoose.model("CusinfoInfo", CusinfoInfoSchema);

module.exports = CusinfoInfo;