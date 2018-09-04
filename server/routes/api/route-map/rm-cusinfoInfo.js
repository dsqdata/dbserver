/********************************************************************
 * (../controllers/web/account.ctl)路由器配置
 * 映射url到控制器方法,对外提供服务
 * url:{http-method:controller.method}//直接映射方法
 * url:{http-method:['filter',controller.method]}//映射时配置过滤器
 ********************************************************************/

const {cusinfoInfo, account, emeter} = require('../../../lib/controller');
module.exports.routeConfig = {
    '/cusinfo/': [
        {'getCusinfoInfos': {post: ['baseFilter', cusinfoInfo.getCusinfoInfos]}},
        {'addCusinfoInfo': {post: ['baseFilter', cusinfoInfo.addCusinfoInfo]}},
        {'delCusinfoInfo': {post: ['baseFilter', cusinfoInfo.delCusinfoInfo]}},
    ],
    '/account/': [
        {'getAccountInfos': {post: ['baseFilter', account.getAccount]}},
        {'addAccountInfo': {post: ['baseFilter', account.addAccount]}},
        {'delAccountInfo': {post: ['baseFilter', account.delAccount]}},
        {'addBalanceInfo': {post: ['baseFilter', account.addBalance]}},
    ],
    '/emeter/': [
        {'getEmeterInfos': {post: ['baseFilter', emeter.getEmeters]}},
        {'addEmeterInfo': {post: ['baseFilter', emeter.addEmeter]}},
        {'delEmeterInfo': {post: ['baseFilter', emeter.delEmeter]}},
        {'getEmetersUnopen': {post: ['baseFilter', emeter.getEmetersUnopen]}},

    ]
};
