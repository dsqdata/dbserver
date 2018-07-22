const mongoose = require('mongoose');
const isProd = process.env.NODE_ENV === 'production'
const {settings} = require('../../utils');

// if (!isProd) {
//     mongoose.connect("mongodb://47.93.217.170:3017/jsth_db");
// } else {
mongoose.connect('mongodb://' + settings.USERNAME + ':' + settings.PASSWORD + '@' + settings.HOST + ':' + settings.PORT + '/' + settings.DB + '');
// }

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once('open', function () {
    console.log('连接数据成功')
})

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function () {
    console.log('数据库断开，重新连接数据库');
    // mongoose.connect(config.url, {server:{auto_reconnect:true}});
});
exports.ClassInfo = require('./ClassInfo');
exports.RouteInfo = require('./RouteInfo');

exports.FloorInfo = require('./FloorInfo');
exports.CommunityInfo = require('./CommunityInfo');
exports.CompanyInfo = require('./CompanyInfo');
exports.CusinfoInfo = require('./CusinfoInfo');
exports.AdminUser = require('./AdminUser');
exports.User = require('./User');
exports.AdminGroup = require('./AdminGroup');
exports.AdminResource = require('./AdminResource');
exports.ContentCategory = require('./ContentCategory');
exports.Content = require('./Content');
exports.ContentTag = require('./ContentTag');
exports.Message = require('./Message');
exports.UserNotify = require('./UserNotify');
exports.Notify = require('./Notify');
exports.SystemConfig = require('./SystemConfig');
exports.DataOptionLog = require('./DataOptionLog');
exports.SystemOptionLog = require('./SystemOptionLog');
exports.Ads = require('./Ads');
exports.AdsItems = require('./AdsItems');
exports.UserPosi = require('./UserPosi');
exports.Emeter = require('./Emeter');
