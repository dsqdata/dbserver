var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var FloorInfoSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
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
    status: {
        type: Number,
        default: 1
    },//0-失效 1-生效
    date: {
        type: Date,
        default: Date.now
    },
});
var FloorInfo = mongoose.model("FloorInfo", FloorInfoSchema);
module.exports = FloorInfo;