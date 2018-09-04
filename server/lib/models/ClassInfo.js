var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var ClassInfoSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    floorId: String,
    floorName: String,
    companyId: String,
    companyName: String,
    communityId: String,
    communityName: String,
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
var ClassInfo = mongoose.model("ClassInfo", ClassInfoSchema);
module.exports = ClassInfo;