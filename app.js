var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

require('./server/lib/models');
var app = express();
var indexRouter = require('./server/routes/api/index');
var logger = require('./server/utils/logHelper');
var logHelper = logger.helper;
logger.use(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
//监听未捕获的异常
process.on('uncaughtException', function (err) {
    logHelper.error('log uncaughtException error', err)
})
//监听Promise没有被捕获的失败函数
process.on('unhandledRejection', function (err, promise) {
    logHelper.error('log unhandledRejection error ', err)
    logHelper.error('log unhandledRejection promise ', promise)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    if (req.method == "GET" || req.method == "get") {
        res.redirect('/');
    } else {
        next(createError(404));
        // res.status(404).json({error: `${req.url} Not found.`}).end();
    }
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
