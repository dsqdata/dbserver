/**
 * 系统基础配置
 */
module.exports = {

    secret_token: 'jsth_token',
    session_secret: 'jsth', // 务必修改
    auth_cookie_name: 'jsth',
    cache_maxAge: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //1 hours
    serverPort: 8082,

    //    数据库配置
    URL: 'mongodb://47.93.217.170:3017/jsth_db',
    DB: 'jsth_db',
    HOST: '47.93.217.170',
    PORT: 3017,
    USERNAME: 'jsth',
    PASSWORD: 'dongsiqi12',


    //个推配置
    GETUI_HOST: 'http://sdk.open.api.igexin.com/apiex.htm',//个推http的域名
    GETUI_DC_APPID: 'ZcUoYbInL361xlMOPTCd99',//医护APPID
    GETUI_DC_APPKEY: '3CAp1IqslJ9HqaHxF89LK6',//医护APPKEY
    GETUI_DC_MASTERSECRET: '2II8a7ocqK9XtK2mV4mWf5',//医护MASTERSECRET
    GETUI_PA_APPID: '6VVFiplGoeAWFA0kUh0x26',//患者APPID
    GETUI_PA_APPKEY: '9opBiDLoPU6tBWwi6EUMS3',//患者APPKEY
    GETUI_PA_MASTERSECRET: 'FPR4Cr2cLw5lmNxY2qyaX5',//患者MASTERSECRET

    //日志文件配置
    log4js_configure: {
        appenders: {
            console: {type: "console"},
            logInfo: {type: "dateFile", filename: "./logs/info/logInfo.log", pattern: ".yyyy-MM-dd"},
            logDebug: {type: "dateFile", filename: "./logs/debug/logDebug.log", pattern: ".yyyy-MM-dd"},
            logWarn: {type: "dateFile", filename: "./logs/warn/logWarn.log", pattern: ".yyyy-MM-dd"},
            logError: {type: "dateFile", filename: "./logs/error/logError.log", pattern: ".yyyy-MM-dd"}
        },
        categories: {
            default: {appenders: ["console"], level: "trace"},
            logInfo: {appenders: ["console", "logInfo"], level: "info"},
            logDebug: {appenders: ["console", "logDebug"], level: "debug"},
            logWarn: {appenders: ["console", "logWarn"], level: "warn"},
            logErr: {appenders: ["console", "logError"], level: "error"}
        },
        replaceConsole: true
    },

    //Token 配置
    secretToken: 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx',

    //位置信息配置
    maxDistanceSub: 10000,//10公里
    maxDistanceAll: 50000,//50公里
    rmgps: [125.3312183947, 43.8927210421],//人民广场经纬度
    EARTHRADIUS: 6370996.81,//地球半径

};



