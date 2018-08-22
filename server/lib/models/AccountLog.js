var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var AccountLogSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    cusinfoId: {type: String, ref: 'CusinfoInfo'},//客户ID
    meterId:{type: String},//卡ID
    balance:Number,//余额
    status: {
        type: Number,
        default: 1
    },//0-失效 1-生效/开户 2-销户
    date: {
        type: Date,
        default: Date.now
    },
});


var  AccountLog = mongoose.model("AccountLog", AccountLogSchema);

module.exports = AccountLog;