/********************************************************************
 * (../controllers/web/account.ctl)路由器配置
 * 映射url到控制器方法,对外提供服务
 * url:{http-method:controller.method}//直接映射方法
 * url:{http-method:['filter',controller.method]}//映射时配置过滤器
 ********************************************************************/

const {adminUser, adminGroup} = require('../../../lib/controller');
module.exports.routeConfig = {
    // 管理员登录
    // router.post('/admin/doLogin', AdminUser.loginAction);
    '/admin/': [
        {'doLogin': {post: adminUser.loginAction}},
        {'getAdminUsers': {post: ['baseFilter', 'gridPageFilter', adminUser.getAdminUsers]}},
    ],
    '/group/': [
        {'getAdminGroups': {post: ['gridPageFilter', adminGroup.getAdminGroups]}},
    ]
};
