var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var CusinfoInfoSchema = new Schema({
    _id: {type: String, default: shortid.generate},
    name: String,
    allname: String,
    address: String,
    contacts: String,
    tel: String,
    introduction: String,
    estatus: {type: Number, default: 0},//电卡开户 //0- no 1- yes
    emeter: [{
        meterId: {type: String},//卡ID
        meterNo: String,
        balance: {type: Number, default: 0},//余额
        srcBalance: {type: Number, default: 0},//原表转入金额(元)
        initBalance: {type: Number, default: 0},//初始金额(元)
        arreBalance: {type: Number, default: 0},//允许赊欠金额(元)
        powerThreshold: {type: Number, default: 0},//功率阈值(W)
        maxPrice: {type: Number, default: 0},//尖电价(元)
        lowPrice: {type: Number, default: 0},//峰电价(元)
        equPrice: {type: Number, default: 0},//平电价(元)
        minPrice: {type: Number, default: 0},//谷电价(元)
        alarmA: {type: Number, default: 0},//告警金额A(元)
        alarmB: {type: Number, default: 0},//告警金额B(元)
        meterType: {type: String, default: 'M'},//用电类型 M-居民 S-商业
        alarmFlagA: {type: String, default: 'N'},//告警金额A提示 Y-yes N-no
        alarmFlagB: {type: String, default: 'N'},//告警金额B提示 Y-yes N-no
        prepayment: {type: String, default: 'N'},//预付费模式 Y-yes N-no
    }],
    wstatus: {type: Number, default: 0},//水卡开户
    branch: {type: String, required: true},//所属公司
    status: {type: Number, default: 1},//0-失效 1-生效
    date: {type: Date, default: Date.now}
});


var CusinfoInfo = mongoose.model("CusinfoInfo", CusinfoInfoSchema);

module.exports = CusinfoInfo;