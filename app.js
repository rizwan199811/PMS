
var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser=require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var PassCategoryRouter = require('./routes/pass_categry');
var addnewcategoryRouter = require('./routes/add-new-category');
var addnewpasswordRouter = require('./routes/add-new-password');
var viewpasswordRouter = require('./routes/view-password');
var joinRouter = require('./routes/join');
var api = require('./api/add-category');
var usersapi=require('./api/user');
var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin:'http://localhost:3000'}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/pass_categry', PassCategoryRouter);
app.use('/add-new-category', addnewcategoryRouter);
app.use('/add-new-password', addnewpasswordRouter);
app.use('/view-password',viewpasswordRouter );
app.use('/join',joinRouter );
app.use('/api',api);
app.use('/uapi',usersapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.status(404).json({
    error:"Page Not Found"
  
  })
  res.status(500).json({
    error:"Internal Server Error"
  
  })
  
});

module.exports = app;
