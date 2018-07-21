const mongoose = require('mongoose');
var shortid = require('shortid');
module.exports = mongoose.model("UserPosi", {
    _id: {
        type: String,

        'default': shortid.generate
    },
    userId: String,
    time: String,
    posi: String,
    img: String,
    otherInfo: Object,
    status: {type: String, default: "1"},
    date: {type: Date, default: Date.now}
})