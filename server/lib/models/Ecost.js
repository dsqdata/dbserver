var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var EcostSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
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


var Ecost = mongoose.model("Ecost", EcostSchema);

module.exports = Ecost;