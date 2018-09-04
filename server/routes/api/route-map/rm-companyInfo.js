/********************************************************************
 * (../controllers/web/account.ctl)路由器配置
 * 映射url到控制器方法,对外提供服务
 * url:{http-method:controller.method}//直接映射方法
 * url:{http-method:['filter',controller.method]}//映射时配置过滤器
 ********************************************************************/

const {companyInfo} = require('../../../lib/controller');
const {communityInfo} = require('../../../lib/controller');
const {floorInfo} = require('../../../lib/controller');
const {classInfo} = require('../../../lib/controller');
module.exports.routeConfig = {
    '/company/': [
        {'getCompanyInfoTree': {post: ['baseFilter', companyInfo.getCompanyInfoTree]}},
        {'getCompanyInfos': {post: companyInfo.getCompanyInfos}},
        {'addCompanyInfo': {post: companyInfo.addCompanyInfo}},
        {'delCompanyInfo': {post: companyInfo.delCompanyInfo}},
    ],
    '/community/': [
        {'getCommunityInfos': {post: ['baseFilter', communityInfo.getCommunityInfos]}},
        {'addCommunityInfo': {post: ['baseFilter', communityInfo.addCommunityInfo]}},
        {'delCommunityInfo': {post: ['baseFilter', communityInfo.delCommunityInfo]}},
    ],
    '/floor/': [
        {'getFloorInfos': {post: ['baseFilter', floorInfo.getFloorInfos]}},
        {'addFloorInfo': {post: ['baseFilter', floorInfo.addFloorInfo]}},
        {'delFloorInfo': {post: ['baseFilter', floorInfo.delFloorInfo]}},
    ],
    '/class/': [
        {'getClassInfos': {post: ['baseFilter', classInfo.getClassInfos]}},
        {'addClassInfo': {post: ['baseFilter', classInfo.addClassInfo]}},
        {'delClassInfo': {post: ['baseFilter', classInfo.delClassInfo]}},
    ],
    '/route/': [
        {'getRouteInfos': {post: ['baseFilter', classInfo.getRouteInfos]}},
        {'addRouteInfo': {post: ['baseFilter', classInfo.addRouteInfo]}},
        {'delRouteInfo': {post: ['baseFilter', classInfo.delRouteInfo]}},
    ]
};
