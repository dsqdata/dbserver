var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    cusinfoId: {type: String, ref: 'CusinfoInfo'},//客户ID
    meterId: {type: String},//卡ID
    meterNo: String,
    meterType: {type: String, default: 'e'},//e电卡　w水卡
    balance: {type: Number, default: 0},//余额
    status: {
        type: Number,
        default: 1
    },//0-失效 1-生效/开户 2-销户
    date: {
        type: Date,
        default: Date.now
    },
});


var Account = mongoose.model("Account", AccountSchema);

module.exports = Account;