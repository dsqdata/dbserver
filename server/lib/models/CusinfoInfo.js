var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var CusinfoInfoSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
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


var CusinfoInfo = mongoose.model("CusinfoInfo", CusinfoInfoSchema);

module.exports = CusinfoInfo;